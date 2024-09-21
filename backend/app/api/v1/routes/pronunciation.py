from fastapi import APIRouter, Depends, HTTPException, UploadFile, File, Form, Request
from sqlalchemy.orm import Session
from pydantic import BaseModel
from app.api.v1.controllers.pronunciation_controller import (
    create_pronunciation,
    score_pronunciation,
)
from app.api.v1.controllers.passage_controller import get_passage_by_id
import torchaudio
from speechbrain.inference.TTS import Tacotron2
from speechbrain.inference.vocoders import HIFIGAN

from app.db.session import get_db
import whisper
import os


class TextRequest(BaseModel):
    text: str


router = APIRouter()

# Initialize Whisper model and tacotron2 model
model = whisper.load_model("base")
tacotron2 = Tacotron2.from_hparams(
    source="speechbrain/tts-tacotron2-ljspeech", savedir="tmpdir_tts"
)

hifi_gan = HIFIGAN.from_hparams(
    source="speechbrain/tts-hifigan-ljspeech", savedir="tmpdir_vocoder"
)


@router.post("/upload/")
async def upload_pronunciation(
    user_id: int = Form(...),
    file: UploadFile = File(...),
    passage_id: int = Form(...),
    db: Session = Depends(get_db),
):
    # check if temp directory exists, if not create.
    temp_directory = "temp"
    if not os.path.exists(temp_directory):
        os.makedirs(temp_directory)

    # Save the uploaded file locally
    file_location = f"{temp_directory}/{file.filename}"
    with open(file_location, "wb+") as file_object:
        file_object.write(file.file.read())

    # Use Whisper to convert audio to text
    result = model.transcribe(file_location)
    transcription = result.get("text", "")
    #  this will be dynamic in the future
    db_passage = get_passage_by_id(db, passage_id)
    if not db_passage:
        raise HTTPException(status_code=404, detail="Passage not found")

    pronunciation_scores = score_pronunciation(db_passage.content, transcription)

    db_pronunciation = create_pronunciation(
        db=db,
        user_id=user_id,
        audio_file=file.filename,
        feedback=transcription,
        scores=pronunciation_scores,
    )

    os.remove(file_location)

    if db_pronunciation:
        return db_pronunciation
    raise HTTPException(status_code=400, detail="Error processing pronunciation")


@router.post("/text/")
async def pronounce_text(
    request: Request, body: TextRequest, db: Session = Depends(get_db)
):
    text = body.text
    if not text:
        raise HTTPException(status_code=400, detail="Text must be provided")

    # create mel-spectrogram from text
    mel_output, mel_length, alignment = tacotron2.encode_text(text)

    # Convert the mel-spectrogram to waveform using HiFi-GAN
    waveforms = hifi_gan.decode_batch(mel_output)

    # check for audio dir existence
    audio_directory = "audio"
    if not os.path.exists(audio_directory):
        os.makedirs(audio_directory)
    audio_path = f"{audio_directory}/audio.wav"

    try:
        # convert waveform to audio file with torchaudio and save it
        torchaudio.save(
            audio_path, waveforms.squeeze(1), 22050
        )  # 22050 is the sample rate, which mean 22050 samples are used per second to capture the audio
    except Exception as e:
        raise HTTPException(
            status_code=500, detail=f"Error saving audio file: {str(e)}"
        )

    # return audio url to access the audio file
    base_url = str(request.base_url)
    audio_url = f"{base_url}audio/audio.wav"

    return {"audio_url": audio_url}

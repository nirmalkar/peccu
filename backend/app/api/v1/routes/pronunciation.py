from fastapi import APIRouter, Depends, HTTPException, UploadFile, File, Form
from sqlalchemy.orm import Session
from app.api.v1.controllers.pronunciation_controller import (
    create_pronunciation,
    score_pronunciation,
)
from app.db.session import get_db
import whisper
import os

router = APIRouter()

# Initialize Whisper model
model = whisper.load_model("base")


@router.post("/upload/")
async def upload_pronunciation(
    user_id: int = Form(...),
    file: UploadFile = File(...),
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
    expected_text = "Hello, this is the test. This is the. This is the test."

    pronunciation_scores = score_pronunciation(expected_text, transcription)

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

from fastapi import APIRouter, Depends, HTTPException, UploadFile, File
from sqlalchemy.orm import Session
from app.api.v1.controllers.pronunciation_controller import create_pronunciation
from app.db.session import get_db
import whisper
import os

router = APIRouter()

model = whisper.load_model("base")


@router.post("/upload/")
async def upload_pronunciation(
    user_id: int, file: UploadFile = File(...), db: Session = Depends(get_db)
):
    # Save the uploaded file locally
    file_location = f"temp/{file.filename}"
    with open(file_location, "wb+") as file_object:
        file_object.write(file.file.read())

    # Use Whisper to convert audio to text
    result = model.transcribe(file_location)
    transcription = result.get("text", "")

    # Assuming feedback is the transcription or an evaluation of it
    feedback = transcription if transcription else "No transcription available"

    # Save the result to the database
    db_pronunciation = create_pronunciation(
        db=db, user_id=user_id, audio_file=file.filename, feedback=feedback
    )

    # Clean up the local file
    os.remove(file_location)

    if db_pronunciation:
        return db_pronunciation
    raise HTTPException(status_code=400, detail="Error processing pronunciation")

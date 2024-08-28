from fastapi import APIRouter, Depends, HTTPException, UploadFile, File
from sqlalchemy.orm import Session
from app.api.v1.controllers.pronunciation_controller import create_pronunciation
from app.db.session import get_db

router = APIRouter()


@router.post("/upload/")
async def upload_pronunciation(
    user_id: int, file: UploadFile = File(...), db: Session = Depends(get_db)
):
    # Save the file and call Whisper (as described earlier)
    # For simplicity, assume feedback is "good pronunciation"
    feedback = "good pronunciation"
    db_pronunciation = create_pronunciation(
        db=db, user_id=user_id, audio_file=file.filename, feedback=feedback
    )
    if db_pronunciation:
        return db_pronunciation
    raise HTTPException(status_code=400, detail="Error processing pronunciation")

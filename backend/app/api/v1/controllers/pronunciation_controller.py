from sqlalchemy.orm import Session
from app.models.pronunciation import Pronunciation


def create_pronunciation(db: Session, user_id: int, audio_file: str, feedback: str):
    pronunciation = Pronunciation(
        user_id=user_id, audio_file=audio_file, feedback=feedback
    )
    db.add(pronunciation)
    db.commit()
    db.refresh(pronunciation)
    return pronunciation

from sqlalchemy.orm import Session
from models.user_submission import UserSubmission
from schemas.user_submission import UserSubmissionCreate


def create_user_submission(db: Session, submission: UserSubmissionCreate):
    db_submission = UserSubmission(
        passage_id=submission.passage_id,
        user_id=submission.user_id,
        audio_url=submission.audio_url,
    )
    db.add(db_submission)
    db.commit()
    db.refresh(db_submission)
    return db_submission


def get_user_submissions(db: Session, user_id: int):
    return db.query(UserSubmission).filter(UserSubmission.user_id == user_id).all()

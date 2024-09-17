from sqlalchemy.orm import Session
from app.models.passage import Passage
from app.schemas.passage import PassageCreate


def get_passage_by_id(db: Session, passage_id: int):

    return db.query(Passage).filter(Passage.id == passage_id).first()


def create_passage(db: Session, passage: PassageCreate, user_id: int = None):
    db_passage = Passage(
        title=passage.title,
        content=passage.content,
        length=passage.length,
        difficulty=passage.difficulty,
        feedback_required=passage.feedback_required,
        feedback_type=passage.feedback_type,
        feedback_details=passage.feedback_details,
        tags=",".join(passage.tags),
        author_id=passage.author_id,
        user_id=user_id,
    )
    db.add(db_passage)
    db.commit()
    db.refresh(db_passage)
    return db_passage

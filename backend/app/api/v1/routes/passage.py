from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.models.passage import Passage as PassageModel
from typing import List, Optional
from app.schemas.passage import Passage as PassageSchema
from app.schemas.passage import PassageCreate
from app.api.v1.controllers.passage_controller import create_passage, get_passage_by_id
from app.db.session import get_db

router = APIRouter()


@router.post("/", response_model=PassageSchema)
def create_new_passage(
    passage: PassageCreate,
    db: Session = Depends(get_db),
    user_id: Optional[int] = None,
):
    return create_passage(db, passage, user_id=user_id)


@router.get("/{passage_id}", response_model=PassageSchema)
def get_passage(passage_id: int, db: Session = Depends(get_db)):
    db_passage = get_passage_by_id(db, passage_id)
    if db_passage is None:
        raise HTTPException(status_code=404, detail="Passage not found")
    return db_passage


@router.get("/", response_model=List[PassageSchema])
def list_passages(db: Session = Depends(get_db)):
    return db.query(PassageModel).all()

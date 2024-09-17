from pydantic import BaseModel
from datetime import datetime


class UserSubmissionCreate(BaseModel):
    passage_id: int
    user_id: int
    audio_url: str


class UserSubmission(BaseModel):
    id: int
    passage_id: int
    user_id: int
    audio_url: str
    created_at: datetime

    class Config:
        orm_mode = True

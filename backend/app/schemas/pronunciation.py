from pydantic import BaseModel


class PronunciationBase(BaseModel):
    audio_file: str
    feedback: str
    score: dict


class PronunciationCreate(PronunciationBase):
    user_id: int


class PronunciationResponse(PronunciationBase):
    id: int
    user_id: int

    class Config:
        orm_mode: True

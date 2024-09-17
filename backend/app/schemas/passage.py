from pydantic import BaseModel, validator
from typing import List, Optional, Union
from datetime import datetime


class PassageBase(BaseModel):
    title: str
    content: str
    length: str
    difficulty: str
    feedback_required: bool
    feedback_type: str
    feedback_details: str
    tags: Union[List[str], str]
    author_id: int

    @validator("tags", pre=True)
    def parse_tags(cls, value):
        if isinstance(value, str):
            return [
                tag.strip() for tag in value.split(",")
            ]  # Split by commas and strip spaces
        return value


class PassageCreate(PassageBase):
    pass


class Passage(PassageBase):
    id: int
    created_at: datetime
    user_id: Optional[int]

    class Config:
        orm_mode = True

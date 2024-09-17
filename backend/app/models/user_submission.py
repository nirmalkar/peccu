from sqlalchemy import Column, Integer, String, DateTime, ForeignKey
from sqlalchemy.orm import relationship
from datetime import datetime
from app.core.config import Base


class UserSubmission(Base):
    __tablename__ = "user_submissions"

    id = Column(Integer, primary_key=True, index=True)
    passage_id = Column(Integer, ForeignKey("passages.id"))
    passage = relationship("Passage")

    user_id = Column(Integer, ForeignKey("users.id"))
    user = relationship("User")

    audio_url = Column(String)
    created_at = Column(DateTime, default=datetime.utcnow)

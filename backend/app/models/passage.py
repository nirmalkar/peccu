from sqlalchemy import Column, Integer, String, Boolean, Text, DateTime, ForeignKey
from sqlalchemy.orm import relationship
from datetime import datetime
from app.core.config import Base


class Passage(Base):
    __tablename__ = "passages"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String, index=True)
    content = Column(Text)
    length = Column(String)
    difficulty = Column(String)
    created_at = Column(DateTime, default=datetime.utcnow)

    author_id = Column(Integer, ForeignKey("authors.id"))
    author = relationship("Author", back_populates="passages")

    user_id = Column(Integer, ForeignKey("users.id"), nullable=True)
    user = relationship("User", back_populates="passages")

    feedback_required = Column(Boolean, default=True)
    feedback_type = Column(String)
    feedback_details = Column(Text)

    tags = Column(Text)

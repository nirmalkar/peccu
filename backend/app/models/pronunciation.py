from sqlalchemy import Column, Integer, String, ForeignKey, JSON
from sqlalchemy.orm import relationship
from app.core.config import Base


class Pronunciation(Base):
    __tablename__ = "pronunciations"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"))
    audio_file = Column(String)
    feedback = Column(String)
    scores = Column(JSON)

    user = relationship("User", back_populates="pronunciations")

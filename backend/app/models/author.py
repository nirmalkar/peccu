from sqlalchemy import Column, Integer, String, Text
from sqlalchemy.orm import relationship
from app.core.config import Base


class Author(Base):
    __tablename__ = "authors"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, index=True)
    bio = Column(Text)

    passages = relationship("Passage", back_populates="author")

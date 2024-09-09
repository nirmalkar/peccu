from sqlalchemy.orm import Session
from app.models.pronunciation import Pronunciation
from difflib import SequenceMatcher


def score_pronunciation(expected_text: str, transcribed_text: str) -> dict:
    expected_words = expected_text.split()
    transcribed_words = transcribed_text.split()

    scores = {}

    for transcribed_word in transcribed_words:
        best_score = 0
        for expected_word in expected_words:
            # Calculate similarity ratio
            score = SequenceMatcher(None, transcribed_word, expected_word).ratio()
            if score > best_score:
                best_score = score

        scores[transcribed_word] = round(best_score * 100, 2)

    return scores


def create_pronunciation(
    db: Session, user_id: int, audio_file: str, feedback: str, scores: dict
):
    pronunciation = Pronunciation(
        user_id=user_id, audio_file=audio_file, feedback=feedback, scores=scores
    )
    db.add(pronunciation)
    db.commit()
    db.refresh(pronunciation)
    return pronunciation

import logging
from app.core.config import Base
from app.core.config import engine


def init_db():
    logging.info("Initializing database...")
    try:
        import app.models.user
        import app.models.pronunciation

        Base.metadata.create_all(bind=engine)
        logging.info("Database initialized successfully.")
    except Exception as e:
        logging.error(f"Error initializing database: {e}")
        raise

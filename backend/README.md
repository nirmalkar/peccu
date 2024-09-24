# Peccu FastAPI Server

This is the backend for Peccu, an AI-driven pronunciation and word communication improvement app. The FastAPI server provides API endpoints for speech recognition, feedback on pronunciation, and user interaction with AI for language learning.

Table of Contents

- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Running the Server](#running-the-server)
- [Running with Docker](#running-with-docker)
- [API Documentation](#api-documentation)
- [Testing](#testing)
- [Project Structure](#project-structure)

## Prerequisites

Ensure that the following software is installed on your machine:

- Python 3.9+
- pip (Python package installer)
- FastAPI
- Docker (optional, for running the server in a container)

## Installation

`Step 1`: Set up a Virtual Environment

```bash
python3 -m venv venv
source venv/bin/activate
```

`Step 2`: Install Dependencies

```bash
pip install -r requirements.txt

```

`Note`: Ensure you have a valid requirements.txt file, which might include libraries like fastapi, uvicorn, and whisper-ai.

## Running the Server

To start the FastAPI server, run the following command:

```bash
uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
```

## Running with Docker

- Build the Docker Image and running it.

```bash
docker compose up backend --build
```

- The server will start on http://127.0.0.1:8000 or http://localhost:3000/.

## API Documentation

FastAPI provides interactive API documentation by default.

Swagger UI: Visit http://127.0.0.1:8000/docs for Swagger UI documentation.
ReDoc: Visit http://127.0.0.1:8000/redoc for ReDoc documentation.

## Testing

```bash
pytest

```

## Project Structure

```bash
peccu-backend/
├── app/
│ ├── api/
│ │ └── v1/
│ │ └── endpoints/
│ │ ├── pronunciation.py # Routers for pronunciation
│ │ └── user.py # Routers for user
│ ├── controllers/
│ │ ├── pronunciation.py # CRUD operations for pronunciation
│ │ └── user.py # CRUD operations for user
│ ├── core/
│ │ ├── config.py # Configuration settings
│ │ ├── security.py # Security utilities (e.g., password hashing)
│ │ └── utils.py # Utility functions
│ ├── db/
│ │ ├── base.py # Base class for models
│ │ ├── session.py # Database session management
│ │ └── init_db.py # Database initialization
│ ├── models/
│ │ ├── pronunciation.py # Pronunciation model
│ │ └── user.py # User model
│ ├── schemas/
│ │ ├── pronunciation.py # Pydantic schemas for pronunciation
│ │ └── user.py # Pydantic schemas for user
│ ├── main.py # Main application entry point
│ └── **init**.py # Package initialization
├── Dockerfile # Docker configuration file
├── requirements.txt # Python dependencies
└── .env # Environment variables

```

## Contributing

Feel free to open issues or submit pull requests if you have suggestions or improvements for the server.

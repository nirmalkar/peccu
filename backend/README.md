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

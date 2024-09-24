# Peccu

Peccu is an AI-driven application designed to improve users' word communication, specifically pronunciation, grammar, and voice modulation. With Peccu, users can have conversations with AI, receive feedback on their pronunciation, and learn how to speak words clearly, as locals would.

## Features

- **AI-Powered Conversations**: Engage in real-time conversations with the AI to practice and enhance your speaking skills.
- **Pronunciation Feedback**: Get detailed feedback on the pronunciation of words used during conversations.
- **Grammar Analysis**: Receive corrections and suggestions on the grammar used in your sentences.
- **Voice Modulation Guidance**: Improve your voice modulation to sound more natural and expressive.

## Planned Features

- **Assessment-Based Conversations**: Choose an assessment, converse with the AI (Peecu), and get feedback focused on pronunciation, grammar, and voice modulation.

## Project Structure

```bash
peccu/
│
├── frontend/           # Next.js (TypeScript) application
│   ├── pages/
│   ├── components/
│   ├── styles/
│   ├── tests/
│   ├── Dockerfile
│   ├── package.json
│   ├── tsconfig.json
│   └── ...
│
├── backend/            # FastAPI (Python) application
│   ├── app/
│   ├── tests/
│   ├── Dockerfile
│   ├── requirements.txt
│   └── ...
│
├── docker-compose.yml
├── docker-compose.prod.yml
├── .env
└── Makefile
```

# Getting Started

## Prerequisites

**Docker**: Ensure Docker is installed on your machine.
Docker: [Install Docker](https://docs.docker.com/desktop/) <br/>

### Installation

1. Clone the repository:

```bash
git clone https://github.com/nirmalkar/peccu.git
cd peccu
```

2. Go to Backend directory create these.

```bash
mkdir audio
touch peccu.db
```

## Running the Application

### Run the Application Using Docker Compose

To start the entire application (backend, frontend, and Redis), run:

```bash
docker compose up --build
```

This command will:

Build the frontend and backend Docker images.
Start the services.
Mount the backend and frontend directories, allowing changes to be reflected without restarting the containers.

## Access the Application

Frontend: Open http://localhost:3000 in your browser to view the Next.js frontend. <br/>
Backend: The FastAPI backend will be accessible at http://localhost:8000.

## Stopping the Application

To stop the application, simply run:

```bash
docker-compose down
```

# Testing

**_run test altogether_**: frontend and backend both have test files to run them altogether.

```bash
make test
```

**_Frontend_**: Tests are located in the **_frontend/tests_** directory. You can run them using:

```bash
npm run test
```

**_Backend_**: Tests are located in the **_backend/tests_** directory. Run them with:

```bash
pytest

```

## Contributing

Feel free to open issues or submit pull requests if you have suggestions or improvements for the server.

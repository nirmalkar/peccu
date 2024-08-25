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
├── .env
└── Makefile
```

# Getting Started

## Prerequisites

**Docker**: Ensure Docker is installed on your machine.
**Node.js**: Install Node.js (LTS version) for the frontend.
**Python 3.8+**: Install Python for the backend.

### Installation

1. Clone the repository:

```bash
git clone https://github.com/nirmalkar/peccu.git
cd peccu
```

2. Set up environment variables:

```bash
cp .env.example .env
Install frontend dependencies:
```

3. Install frontend dependencies:

```bash
cd frontend
npm install
```

4. Install backend dependencies:

```bash
cd ../backend
pip install -r requirements.txt
```

### Running the Application

```bash
make start
```

This will start both the Next.js frontend and FastAPI backend services.

### Testing

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

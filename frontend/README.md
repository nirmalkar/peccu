# Peccu Frontend
This is the frontend of the Peccu application, designed to help users improve pronunciation and word communication through interactive AI-based learning and feedback.

## Table of Contents
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Running the Server](#running-the-server)
- [Running with Docker](#running-with-docker)
- [API Documentation](#api-documentation)
- [Testing](#testing)
- [Project Structure](#project-structure)
- [Contributing](#contributing)


## Prerequisites
Ensure the following software is installed on your machine:

- Node.js (v16 or higher)
- npm or yarn (for managing dependencies)
- Docker (optional, for running the app in a container)

## Install Dependencies
If you're using npm:
```bash
npm install
```
Or with yarn:
```bash
yarn install
```

## Running the Application

If you're using npm:
```bash
npm run dev
```

Or with yarn:
```bash
yarn dev
```

## Running with Docker
This will start and run the container
```bash
docker compose up peccu-frontend --build
```
## Testing
If you're using npm:
```bash
npm run test
```
Or with yarn:
```bash
yarn test
```

## Project Structure
```bash
peccu-frontend/
├── public/                  # Static assets (e.g., images, fonts, favicon)
│   └── favicon.ico          # Example favicon file
├── src/                     
│   ├── assets/              # Other static files like images, etc.
│   ├── components/          # Shared React components
│   ├── hooks/               # Custom React hooks
│   ├── pages/               # Next.js pages
│   │   ├── api/             # API routes for Next.js (if needed)
│   │   └── index.tsx        # Main home page
│   ├── styles/              # Global styles, css or CSS files
│   │   └── theme.css        # Example theme css file
│   ├── utils/               # Utility functions
│   └── _app.tsx             # Custom Next.js App component
├── Dockerfile               # Docker configuration for the app
├── package.json             # Dependencies and scripts
├── README.md                # Documentation file
└── .gitignore               # Files to ignore in git
```
## Contributing
We welcome contributions to Peccu! Feel free to fork the repo and create pull requests with your improvements or feature suggestions.

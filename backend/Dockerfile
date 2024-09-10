# Use the official Python 3.10 slim image as the base
FROM python:3.10-slim

# Set environment variables to prevent Python from writing .pyc files and to ensure output is flushed immediately
ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1

# Set the working directory in the container
WORKDIR /app

# Install system dependencies
RUN apt-get update && \
    apt-get install -y --no-install-recommends \
        git \
        ffmpeg \
        build-essential \
        libssl-dev \
        libffi-dev \
        python3-dev \
        && rm -rf /var/lib/apt/lists/*

# Copy only the requirements.txt first to leverage Docker cache
COPY requirements.txt /app/

# Upgrade pip to the latest version
RUN pip install --upgrade pip

# Install Python dependencies
RUN pip install --no-cache-dir -r requirements.txt

# Install Whisper AI from GitHub
RUN pip install --no-cache-dir git+https://github.com/openai/whisper.git

# Copy the rest of the application code
COPY . /app

# Ensure the 'temp' directory exists for file uploads
RUN mkdir -p /app/temp

# Expose port 8000 for the FastAPI application
EXPOSE 8000

CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8000", "--reload"]

import debugpy
import os
from fastapi import FastAPI
from app.api.v1.routes import user, pronunciation
from app.db.init_db import init_db
from fastapi.middleware.cors import CORSMiddleware


app = FastAPI()

# Add this block for debugging with debugpy
if os.getenv("DEBUG") == "true":
    print("Starting debug server...")
    debugpy.listen(("0.0.0.0", 5678))  # Port 5678 is used for debugging
    print("Waiting for debugger to attach...")
    debugpy.wait_for_client()

origins = [
    "http://localhost:3000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def read_root():
    return {"message": "Welcome to Peccu!"}


app.include_router(user.router, prefix="/api/v1/users")
app.include_router(pronunciation.router, prefix="/api/v1/pronunciation")


# Call init_db to set up the database and potentially seed initial data
@app.on_event("startup")
async def on_startup():
    # This ensures that the database is initialized when the application starts
    init_db()


# Define any other startup tasks or event handlers here
# For example: logging configuration, etc.


# Optionally, define shutdown events if needed
@app.on_event("shutdown")
async def on_shutdown():
    # Perform any cleanup tasks or close resources if needed
    pass

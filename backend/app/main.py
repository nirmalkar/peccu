from fastapi import FastAPI
from app.api.v1.routes import user, pronunciation
from app.db.init_db import init_db


app = FastAPI()


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

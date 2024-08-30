from pydantic import BaseModel, EmailStr


class UserCreate(BaseModel):
    full_name: str
    email: EmailStr
    password: str
    is_active: bool = True
    is_superuser: bool = False

    class Config:
        orm_mode = True


class UserResponse(BaseModel):
    id: int
    full_name: str
    email: EmailStr

    class Config:
        orm_mode = True

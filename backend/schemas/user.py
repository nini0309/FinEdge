from datetime import datetime
from pydantic import BaseModel, EmailStr, Field


# ---------- Shared ----------
class UserBase(BaseModel):
    email: EmailStr


# ---------- Requests ----------
class UserCreate(UserBase):
    password: str = Field(..., min_length=8)


class UserLogin(BaseModel):
    email: EmailStr
    password: str


# ---------- Responses ----------
class UserResponse(UserBase):
    id: int
    created_at: datetime

    class Config:
        from_attributes = True  # SQLAlchemy compatibility


class MessageResponse(BaseModel):
    message: str

from pydantic import BaseModel, Field
from typing import Optional


class UserDetailsBase(BaseModel):
    name: str = Field(max_length=100)
    address: str = Field(max_length=500)
    phone: str = Field(min_length=10, max_length=10)
    age: int

    aadhar: str = Field(min_length=12, max_length=12)
    pan: str = Field(min_length=10, max_length=10)

    marital_status: bool
    gender: str
    no_of_dependents: int

    self_employed: bool
    property_area: str
    graduate: bool


class UserDetailsCreate(UserDetailsBase):
    pass


class UserDetailsResponse(UserDetailsBase):
    id: int
    user_id: int

    class Config:
        from_attributes = True


class UserDetailsUpdate(BaseModel):
    name: Optional[str] = Field(default=None, max_length=100)
    address: Optional[str] = Field(default=None, max_length=500)
    phone: Optional[str] = Field(default=None, min_length=10, max_length=10)
    age: Optional[int] = None

    aadhar: Optional[str] = Field(default=None, min_length=12, max_length=12)
    pan: Optional[str] = Field(default=None, min_length=10, max_length=10)

    marital_status: Optional[bool] = None
    gender: Optional[str] = None
    no_of_dependents: Optional[int] = None

    self_employed: Optional[bool] = None
    property_area: Optional[str] = None
    graduate: Optional[bool] = None

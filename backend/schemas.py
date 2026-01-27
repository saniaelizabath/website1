
from pydantic import BaseModel, EmailStr

class AdminLogin(BaseModel):
    email: EmailStr
    password: str


class JobCreate(BaseModel):
    title: str
    description: str
    location: str

class NewsResponse(BaseModel):
    id: int
    title: str
    description: str
    image_path: str
    date: str

    class Config:
        orm_mode = True

from pydantic import BaseModel

class NewsCreate(BaseModel):
    title: str
    description: str

class JobCreate(BaseModel):
    title: str
    description: str

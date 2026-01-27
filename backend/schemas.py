
from pydantic import BaseModel, EmailStr
from datetime import datetime, date
from typing import Optional


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


# Employee Schemas
class EmployeeLogin(BaseModel):
    email: EmailStr
    password: str
    employee_id: int  # To identify which employee is logging in


class EmployeeResponse(BaseModel):
    id: int
    name: str
    email: str

    class Config:
        orm_mode = True


# Attendance Schemas
class AttendanceMarkIn(BaseModel):
    employee_id: int
    latitude: float
    longitude: float


class AttendanceMarkOut(BaseModel):
    employee_id: int
    attendance_id: int
    latitude: float
    longitude: float


class AttendanceResponse(BaseModel):
    id: int
    employee_id: int
    date: date
    in_time: Optional[datetime]
    out_time: Optional[datetime]

    class Config:
        orm_mode = True

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

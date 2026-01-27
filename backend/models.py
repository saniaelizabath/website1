from sqlalchemy import Column, Integer, String, Text, DateTime, Date, ForeignKey
from sqlalchemy.orm import relationship
from database import Base
from datetime import datetime


class Admin(Base):
    __tablename__ = "admins"

    id = Column(Integer, primary_key=True, index=True)
    email = Column(String, unique=True, index=True)
    password_hash = Column(String)


class News(Base):
    __tablename__ = "news"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String, nullable=False)
    description = Column(Text, nullable=False)
    image_path = Column(String, nullable=False)
    date = Column(String, nullable=False)


class Job(Base):
    __tablename__ = "jobs"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String, nullable=False)
    description = Column(Text, nullable=False)
    location = Column(String, nullable=False)


class Employee(Base):
    __tablename__ = "employees"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, nullable=False)  # e.g., "Employee 1"
    email = Column(String, unique=True, index=True)
    password_hash = Column(String)  # Storing plain text as per your requirement
    
    # Relationship to attendance records
    attendance_records = relationship("Attendance", back_populates="employee")


class Attendance(Base):
    __tablename__ = "attendance"

    id = Column(Integer, primary_key=True, index=True)
    employee_id = Column(Integer, ForeignKey("employees.id"), nullable=False)
    date = Column(Date, nullable=False)  # Date of attendance
    in_time = Column(DateTime, nullable=True)  # Check-in time
    out_time = Column(DateTime, nullable=True)  # Check-out time
    
    # Relationship to employee
    employee = relationship("Employee", back_populates="attendance_records")
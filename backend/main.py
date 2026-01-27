# from fastapi import FastAPI, Depends, HTTPException, UploadFile, File
# from fastapi.staticfiles import StaticFiles
# from sqlalchemy.orm import Session
# import shutil
# import os

# from database import Base, engine, SessionLocal
# import models, schemas
# from fastapi.middleware.cors import CORSMiddleware

# from fastapi import Form
# from typing import Optional
# from fastapi import Form, File, UploadFile
# from passlib.context import CryptContext
# from jose import jwt
# from datetime import datetime, timedelta
# from passlib.context import CryptContext

# from auth_utils import verify_password, hash_password
# from jwt_utils import create_token
# import uuid


# import smtplib
# from email.message import EmailMessage
# from typing import Optional

# pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")
# # ----------------------------
# # FastAPI App
# # ----------------------------
# app = FastAPI()

# SECRET_KEY = "AdminSecretKey"
# ALGORITHM = "HS256"
# ACCESS_TOKEN_EXPIRE_MINUTES = 60

# SMTP_EMAIL = "sania.elizabath@btech.christuniversity.in"
# SMTP_PASSWORD = "bcjqxsfjfivcibov"


# reset_tokens = {}  # token -> email

# pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")


# app.add_middleware(
#     CORSMiddleware,
#     allow_origins=["http://localhost:5173"],
#     allow_credentials=True,
#     allow_methods=["*"],
#     allow_headers=["*"],
# )
# # ----------------------------
# # Serve uploaded images
# # ----------------------------
# app.mount("/uploads", StaticFiles(directory="uploads"), name="uploads")

# # ----------------------------
# # Create database tables
# # ----------------------------
# Base.metadata.create_all(bind=engine)

# # ----------------------------
# # Database Dependency
# # ----------------------------
# def get_db():
#     db = SessionLocal()
#     try:
#         yield db
#     finally:
#         db.close()

# # ----------------------------
# # News APIs
# # ----------------------------
# # @app.post("/news")

# @app.post("/auth/login")
# def admin_login(
#     email: str = Form(...),
#     password: str = Form(...),
#     db: Session = Depends(get_db)
# ):
#     # Fetch admin from database
#     admin = db.query(models.Admin).filter(models.Admin.email == email).first()
    
#     if not admin:
#         raise HTTPException(status_code=401, detail="Invalid email or password")
    
#     # Check password (plain text comparison as per your requirement)
#     if admin.password_hash != password:
#         raise HTTPException(status_code=401, detail="Invalid email or password")

#     return {"message": "Login successful"}


# reset_tokens = {}

# def send_email(to: str, subject: str, body: str):
#     EMAIL_ADDRESS = "sania.elizabath@btech.christuniversity.in"   # sender
#     EMAIL_PASSWORD = "bcjqxsfjfivcibov"         # 🔑 app password

#     msg = EmailMessage()
#     msg["From"] = EMAIL_ADDRESS
#     msg["To"] = to
#     msg["Subject"] = subject
#     msg.set_content(body)

#     with smtplib.SMTP_SSL("smtp.gmail.com", 465) as server:
#         server.login(EMAIL_ADDRESS, EMAIL_PASSWORD)
#         server.send_message(msg)

# @app.post("/auth/forgot-password")
# def forgot_password(db: Session = Depends(get_db)):
#     # Fetch the admin email from database (assuming only one admin)
#     admin = db.query(models.Admin).first()
    
#     if not admin:
#         raise HTTPException(status_code=404, detail="Admin not found in database")
    
#     email = admin.email

#     token = str(uuid.uuid4())
#     reset_tokens[token] = email

#     reset_link = f"http://localhost:5173/?token={token}"

#     send_email(
#         to=email,
#         subject="Reset Admin Password",
#         body=f"""
# Hello Admin,

# Click the link below to reset your password:

# {reset_link}

# If you did not request this, please ignore this email.
# """
#     )

#     return {"message": "Reset link sent successfully"}


# @app.post("/auth/reset-password")
# def reset_password(
#     token: str = Form(...),
#     new_password: str = Form(...),
#     db: Session = Depends(get_db)
# ):
#     if token not in reset_tokens:
#         raise HTTPException(status_code=400, detail="Invalid or expired token")

#     email = reset_tokens[token]
    
#     # Find admin by email and update password
#     admin = db.query(models.Admin).filter(models.Admin.email == email).first()
    
#     if not admin:
#         raise HTTPException(status_code=404, detail="Admin not found")
    
#     # Update password in database
#     admin.password_hash = new_password
#     db.commit()
    
#     # Remove used token
#     del reset_tokens[token]

#     return {"message": "Password reset successful"}




# @app.post("/news")
# def add_news(
#     title: str = Form(...),
#     description: str = Form(...),
#     date: str = Form(...),
#     image: UploadFile = File(...),
#     db: Session = Depends(get_db)
# ):
#     file_path = f"uploads/news/{image.filename}"
#     with open(file_path, "wb") as buffer:
#         shutil.copyfileobj(image.file, buffer)

#     news = models.News(
#         title=title,
#         description=description,
#         date=date,
#         image_path=file_path
#     )

#     db.add(news)
#     db.commit()
#     db.refresh(news)
#     return news

# @app.get("/news")

# def get_news(db: Session = Depends(get_db)):
#     return db.query(models.News).all()

# # ----------------------------
# # Jobs APIs
# # ----------------------------
# @app.post("/jobs")
# def add_job(job: schemas.JobCreate, db: Session = Depends(get_db)):
#     db_job = models.Job(**job.dict())
#     db.add(db_job)
#     db.commit()
#     return db_job

# @app.put("/jobs/{job_id}")
# def update_job(job_id: int, job: schemas.JobCreate, db: Session = Depends(get_db)):
#     db_job = db.query(models.Job).filter(models.Job.id == job_id).first()
#     if not db_job:
#         raise HTTPException(status_code=404, detail="Job not found")

#     db_job.title = job.title
#     db_job.description = job.description
#     db_job.location = job.location
#     db.commit()
#     return db_job


# @app.get("/jobs")
# def get_jobs(db: Session = Depends(get_db)):
#     return db.query(models.Job).all()

# @app.delete("/news/{news_id}")
# def delete_news(news_id: int, db: Session = Depends(get_db)):
#     news = db.query(models.News).filter(models.News.id == news_id).first()
#     if not news:
#         return {"error": "News not found"}

#     # delete image file
#     if os.path.exists(news.image_path):
#         os.remove(news.image_path)

#     db.delete(news)
#     db.commit()
#     return {"message": "News deleted"}

# @app.put("/news/{news_id}")
# def update_news(
#     news_id: int,
#     title: str = Form(...),
#     description: str = Form(...),
#     date: str = Form(...),
#     image: Optional[UploadFile] = File(None),
#     db: Session = Depends(get_db)
# ):
#     news = db.query(models.News).filter(models.News.id == news_id).first()
#     if not news:
#         raise HTTPException(status_code=404, detail="News not found")

#     news.title = title
#     news.description = description
#     news.date = date

#     # 🔑 IMAGE UPDATE (ONLY IF PROVIDED)
#     if image:
#         file_path = f"uploads/news/{image.filename}"
#         with open(file_path, "wb") as buffer:
#             shutil.copyfileobj(image.file, buffer)
#         news.image_path = file_path

#     db.commit()
#     db.refresh(news)
#     return news

# @app.delete("/jobs/{job_id}")
# def delete_job(job_id: int, db: Session = Depends(get_db)):
#     job = db.query(models.Job).filter(models.Job.id == job_id).first()
#     if not job:
#         return {"error": "Job not found"}

#     db.delete(job)
#     db.commit()
#     return {"message": "Job deleted"}


from fastapi import FastAPI, Depends, HTTPException, UploadFile, File
from fastapi.staticfiles import StaticFiles
from sqlalchemy.orm import Session
import shutil
import os

from database import Base, engine, SessionLocal
import models, schemas
from fastapi.middleware.cors import CORSMiddleware

from fastapi import Form
from typing import Optional
from fastapi import Form, File, UploadFile
from passlib.context import CryptContext
from jose import jwt
from datetime import datetime, timedelta
from passlib.context import CryptContext

from auth_utils import verify_password, hash_password
from jwt_utils import create_token
import uuid


import smtplib
from email.message import EmailMessage
from typing import Optional

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")
# ----------------------------
# FastAPI App
# ----------------------------
app = FastAPI()

SECRET_KEY = "AdminSecretKey"
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 60

SMTP_EMAIL = "sania.elizabath@btech.christuniversity.in"
SMTP_PASSWORD = "bcjqxsfjfivcibov"


reset_tokens = {}  # token -> email

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")


app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
# ----------------------------
# Serve uploaded images
# ----------------------------
app.mount("/uploads", StaticFiles(directory="uploads"), name="uploads")

# ----------------------------
# Create database tables
# ----------------------------
Base.metadata.create_all(bind=engine)

# ----------------------------
# Database Dependency
# ----------------------------
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

# ----------------------------
# News APIs
# ----------------------------
# @app.post("/news")

@app.post("/auth/login")
def admin_login(
    email: str = Form(...),
    password: str = Form(...),
    db: Session = Depends(get_db)
):
    # Fetch admin from database
    admin = db.query(models.Admin).filter(models.Admin.email == email).first()
    
    if not admin:
        raise HTTPException(status_code=401, detail="Invalid email or password")
    
    # Check password (plain text comparison as per your requirement)
    if admin.password_hash != password:
        raise HTTPException(status_code=401, detail="Invalid email or password")

    return {"message": "Login successful"}


reset_tokens = {}

def send_email(to: str, subject: str, body: str):
    EMAIL_ADDRESS = "sania.elizabath@btech.christuniversity.in"   # sender
    EMAIL_PASSWORD = "bcjqxsfjfivcibov"         # 🔑 app password

    msg = EmailMessage()
    msg["From"] = EMAIL_ADDRESS
    msg["To"] = to
    msg["Subject"] = subject
    msg.set_content(body)

    with smtplib.SMTP_SSL("smtp.gmail.com", 465) as server:
        server.login(EMAIL_ADDRESS, EMAIL_PASSWORD)
        server.send_message(msg)

@app.post("/auth/forgot-password")
def forgot_password(db: Session = Depends(get_db)):
    # Fetch the admin email from database (assuming only one admin)
    admin = db.query(models.Admin).first()
    
    if not admin:
        raise HTTPException(status_code=404, detail="Admin not found in database")
    
    email = admin.email

    token = str(uuid.uuid4())
    reset_tokens[token] = email

    reset_link = f"http://localhost:5173/?token={token}"

    send_email(
        to=email,
        subject="Reset Admin Password",
        body=f"""
Hello Admin,

Click the link below to reset your password:

{reset_link}

If you did not request this, please ignore this email.
"""
    )

    return {"message": "Reset link sent successfully"}


@app.post("/auth/reset-password")
def reset_password(
    token: str = Form(...),
    new_password: str = Form(...),
    db: Session = Depends(get_db)
):
    if token not in reset_tokens:
        raise HTTPException(status_code=400, detail="Invalid or expired token")

    email = reset_tokens[token]
    
    # Find admin by email and update password
    admin = db.query(models.Admin).filter(models.Admin.email == email).first()
    
    if not admin:
        raise HTTPException(status_code=404, detail="Admin not found")
    
    # Update password in database
    admin.password_hash = new_password
    db.commit()
    
    # Remove used token
    del reset_tokens[token]

    return {"message": "Password reset successful"}




@app.post("/news")
def add_news(
    title: str = Form(...),
    description: str = Form(...),
    date: str = Form(...),
    image: UploadFile = File(...),
    db: Session = Depends(get_db)
):
    file_path = f"uploads/news/{image.filename}"
    with open(file_path, "wb") as buffer:
        shutil.copyfileobj(image.file, buffer)

    news = models.News(
        title=title,
        description=description,
        date=date,
        image_path=file_path
    )

    db.add(news)
    db.commit()
    db.refresh(news)
    return news

@app.get("/news")

def get_news(db: Session = Depends(get_db)):
    return db.query(models.News).all()

# ----------------------------
# Jobs APIs
# ----------------------------
@app.post("/jobs")
def add_job(job: schemas.JobCreate, db: Session = Depends(get_db)):
    db_job = models.Job(**job.dict())
    db.add(db_job)
    db.commit()
    return db_job

@app.put("/jobs/{job_id}")
def update_job(job_id: int, job: schemas.JobCreate, db: Session = Depends(get_db)):
    db_job = db.query(models.Job).filter(models.Job.id == job_id).first()
    if not db_job:
        raise HTTPException(status_code=404, detail="Job not found")

    db_job.title = job.title
    db_job.description = job.description
    db_job.location = job.location
    db.commit()
    return db_job


@app.get("/jobs")
def get_jobs(db: Session = Depends(get_db)):
    return db.query(models.Job).all()

@app.delete("/news/{news_id}")
def delete_news(news_id: int, db: Session = Depends(get_db)):
    news = db.query(models.News).filter(models.News.id == news_id).first()
    if not news:
        return {"error": "News not found"}

    # delete image file
    if os.path.exists(news.image_path):
        os.remove(news.image_path)

    db.delete(news)
    db.commit()
    return {"message": "News deleted"}

@app.put("/news/{news_id}")
def update_news(
    news_id: int,
    title: str = Form(...),
    description: str = Form(...),
    date: str = Form(...),
    image: Optional[UploadFile] = File(None),
    db: Session = Depends(get_db)
):
    news = db.query(models.News).filter(models.News.id == news_id).first()
    if not news:
        raise HTTPException(status_code=404, detail="News not found")

    news.title = title
    news.description = description
    news.date = date

    # 🔑 IMAGE UPDATE (ONLY IF PROVIDED)
    if image:
        file_path = f"uploads/news/{image.filename}"
        with open(file_path, "wb") as buffer:
            shutil.copyfileobj(image.file, buffer)
        news.image_path = file_path

    db.commit()
    db.refresh(news)
    return news

@app.delete("/jobs/{job_id}")
def delete_job(job_id: int, db: Session = Depends(get_db)):
    job = db.query(models.Job).filter(models.Job.id == job_id).first()
    if not job:
        return {"error": "Job not found"}

    db.delete(job)
    db.commit()
    return {"message": "Job deleted"}


# ----------------------------
# Employee APIs
# ----------------------------
from datetime import date
from location_utils import is_location_allowed

@app.get("/employees")
def get_employees(db: Session = Depends(get_db)):
    """Get all employees (for portal display)"""
    employees = db.query(models.Employee).all()
    return employees


@app.post("/employee/login")
def employee_login(
    email: str = Form(...),
    password: str = Form(...),
    employee_id: int = Form(...),
    db: Session = Depends(get_db)
):
    """Employee login - verify credentials"""
    # Fetch employee from database
    employee = db.query(models.Employee).filter(
        models.Employee.id == employee_id,
        models.Employee.email == email
    ).first()
    
    if not employee:
        raise HTTPException(status_code=401, detail="Invalid credentials")
    
    # Check password (plain text comparison)
    if employee.password_hash != password:
        raise HTTPException(status_code=401, detail="Invalid credentials")

    return {
        "message": "Login successful",
        "employee": {
            "id": employee.id,
            "name": employee.name,
            "email": employee.email
        }
    }


@app.post("/employee/forgot-password")
def employee_forgot_password(
    employee_id: int = Form(...),
    db: Session = Depends(get_db)
):
    """Send password reset email to employee"""
    # Fetch the employee
    employee = db.query(models.Employee).filter(models.Employee.id == employee_id).first()
    
    if not employee:
        raise HTTPException(status_code=404, detail="Employee not found")
    
    email = employee.email
    token = str(uuid.uuid4())
    reset_tokens[token] = {"email": email, "employee_id": employee_id, "type": "employee"}

    reset_link = f"http://localhost:5173/?token={token}&type=employee"

    send_email(
        to=email,
        subject="Reset Employee Password",
        body=f"""
Hello {employee.name},

Click the link below to reset your password:

{reset_link}

If you did not request this, please ignore this email.
"""
    )

    return {"message": "Reset link sent successfully"}


@app.post("/employee/reset-password")
def employee_reset_password(
    token: str = Form(...),
    new_password: str = Form(...),
    db: Session = Depends(get_db)
):
    """Reset employee password"""
    if token not in reset_tokens:
        raise HTTPException(status_code=400, detail="Invalid or expired token")

    token_data = reset_tokens[token]
    
    if token_data.get("type") != "employee":
        raise HTTPException(status_code=400, detail="Invalid token type")
    
    employee_id = token_data.get("employee_id")
    
    # Find employee and update password
    employee = db.query(models.Employee).filter(models.Employee.id == employee_id).first()
    
    if not employee:
        raise HTTPException(status_code=404, detail="Employee not found")
    
    # Update password in database
    employee.password_hash = new_password
    db.commit()
    
    # Remove used token
    del reset_tokens[token]

    return {"message": "Password reset successful"}


# ----------------------------
# Attendance APIs
# ----------------------------

@app.post("/attendance/mark-in")
def mark_attendance_in(
    employee_id: int = Form(...),
    latitude: float = Form(...),
    longitude: float = Form(...),
    db: Session = Depends(get_db)
):
    """Mark attendance IN - check location first"""
    
    # Verify location
    location_check = is_location_allowed(latitude, longitude)
    
    if not location_check["allowed"]:
        raise HTTPException(
            status_code=403, 
            detail="You are not at an allowed location. Please go to the office to mark attendance."
        )
    
    # Check if employee exists
    employee = db.query(models.Employee).filter(models.Employee.id == employee_id).first()
    if not employee:
        raise HTTPException(status_code=404, detail="Employee not found")
    
    # Check if attendance already marked today
    today = date.today()
    existing_attendance = db.query(models.Attendance).filter(
        models.Attendance.employee_id == employee_id,
        models.Attendance.date == today
    ).first()
    
    if existing_attendance:
        if existing_attendance.in_time:
            raise HTTPException(status_code=400, detail="Attendance already marked for today")
    
    # Create or update attendance record
    if not existing_attendance:
        attendance = models.Attendance(
            employee_id=employee_id,
            date=today,
            in_time=datetime.now()
        )
        db.add(attendance)
    else:
        existing_attendance.in_time = datetime.now()
    
    db.commit()
    
    return {
        "message": "Attendance marked successfully",
        "location": location_check["location_name"],
        "time": datetime.now().strftime("%I:%M %p")
    }


@app.post("/attendance/mark-out")
def mark_attendance_out(
    employee_id: int = Form(...),
    latitude: float = Form(...),
    longitude: float = Form(...),
    db: Session = Depends(get_db)
):
    """Mark attendance OUT - check location first"""
    
    # Verify location
    location_check = is_location_allowed(latitude, longitude)
    
    if not location_check["allowed"]:
        raise HTTPException(
            status_code=403, 
            detail="You are not at an allowed location. Please mark exit from office."
        )
    
    # Check if employee exists
    employee = db.query(models.Employee).filter(models.Employee.id == employee_id).first()
    if not employee:
        raise HTTPException(status_code=404, detail="Employee not found")
    
    # Find today's attendance record
    today = date.today()
    attendance = db.query(models.Attendance).filter(
        models.Attendance.employee_id == employee_id,
        models.Attendance.date == today
    ).first()
    
    if not attendance or not attendance.in_time:
        raise HTTPException(status_code=400, detail="Please mark IN time first")
    
    if attendance.out_time:
        raise HTTPException(status_code=400, detail="Exit time already marked for today")
    
    # Update out time
    attendance.out_time = datetime.now()
    db.commit()
    
    return {
        "message": "Exit time marked successfully",
        "location": location_check["location_name"],
        "time": datetime.now().strftime("%I:%M %p")
    }


@app.get("/attendance/{employee_id}")
def get_attendance(
    employee_id: int,
    month: Optional[int] = None,
    year: Optional[int] = None,
    db: Session = Depends(get_db)
):
    """Get attendance records for an employee"""
    
    query = db.query(models.Attendance).filter(models.Attendance.employee_id == employee_id)
    
    # Apply filters if provided
    if month and year:
        query = query.filter(
            models.Attendance.date >= date(year, month, 1)
        )
        # Get last day of month
        if month == 12:
            next_month = date(year + 1, 1, 1)
        else:
            next_month = date(year, month + 1, 1)
        query = query.filter(models.Attendance.date < next_month)
    
    attendance_records = query.order_by(models.Attendance.date.desc()).all()
    
    return attendance_records
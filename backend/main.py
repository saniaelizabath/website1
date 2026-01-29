from fastapi import FastAPI, HTTPException, UploadFile, File, Form
from fastapi.staticfiles import StaticFiles
from fastapi.middleware.cors import CORSMiddleware
import shutil
import os
from typing import Optional
from datetime import datetime, date
import uuid
from bson import ObjectId

import schemas
from database import (
    admins_collection,
    news_collection,
    jobs_collection,
    employees_collection,
    attendance_collection
)
# from backend.unused.auth_utils import verify_password, hash_password
from location_utils import is_location_allowed

import smtplib
from email.message import EmailMessage

# ----------------------------
# FastAPI App
# ----------------------------
app = FastAPI()

SECRET_KEY = "AdminSecretKey"
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 60

SMTP_EMAIL = "sania.elizabath@btech.christuniversity.in"
SMTP_PASSWORD = "bcjqxsfjfivcibov"

reset_tokens = {}  # token -> email/employee data

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
# Email Helper
# ----------------------------
def send_email(to: str, subject: str, body: str):
    EMAIL_ADDRESS = SMTP_EMAIL
    EMAIL_PASSWORD = SMTP_PASSWORD

    msg = EmailMessage()
    msg["From"] = EMAIL_ADDRESS
    msg["To"] = to
    msg["Subject"] = subject
    msg.set_content(body)

    with smtplib.SMTP_SSL("smtp.gmail.com", 465) as server:
        server.login(EMAIL_ADDRESS, EMAIL_PASSWORD)
        server.send_message(msg)


# ----------------------------
# Admin Auth APIs
# ----------------------------
@app.post("/auth/login")
async def admin_login(
    email: str = Form(...),
    password: str = Form(...)
):
    # Fetch admin from MongoDB
    admin = await admins_collection.find_one({"email": email})
    
    if not admin:
        raise HTTPException(status_code=401, detail="Invalid email or password")
    
    # Check password
    if admin["password_hash"] != password:
        raise HTTPException(status_code=401, detail="Invalid email or password")

    return {"message": "Login successful"}


@app.post("/auth/forgot-password")
async def forgot_password():
    # Fetch the admin email from database (assuming only one admin)
    admin = await admins_collection.find_one({})
    
    if not admin:
        raise HTTPException(status_code=404, detail="Admin not found in database")
    
    email = admin["email"]
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
async def reset_password(
    token: str = Form(...),
    new_password: str = Form(...)
):
    if token not in reset_tokens:
        raise HTTPException(status_code=400, detail="Invalid or expired token")

    email = reset_tokens[token]
    
    # Find admin by email and update password
    result = await admins_collection.update_one(
        {"email": email},
        {"$set": {"password_hash": new_password}}
    )
    
    if result.modified_count == 0:
        raise HTTPException(status_code=404, detail="Admin not found")
    
    # Remove used token
    del reset_tokens[token]

    return {"message": "Password reset successful"}


# ----------------------------
# News APIs
# ----------------------------
@app.post("/news")
async def add_news(
    title: str = Form(...),
    description: str = Form(...),
    date: str = Form(...),
    image: UploadFile = File(...)
):
    file_path = f"uploads/news/{image.filename}"
    with open(file_path, "wb") as buffer:
        shutil.copyfileobj(image.file, buffer)

    news_data = {
        "title": title,
        "description": description,
        "date": date,
        "image_path": file_path
    }

    result = await news_collection.insert_one(news_data)
    news_data["_id"] = str(result.inserted_id)
    
    return news_data


@app.get("/news")
async def get_news():
    news_list = []
    async for news in news_collection.find():
        news["_id"] = str(news["_id"])
        news_list.append(news)
    return news_list


@app.put("/news/{news_id}")
async def update_news(
    news_id: str,
    title: str = Form(...),
    description: str = Form(...),
    date: str = Form(...),
    image: Optional[UploadFile] = File(None)
):
    # Find existing news
    news = await news_collection.find_one({"_id": ObjectId(news_id)})
    if not news:
        raise HTTPException(status_code=404, detail="News not found")

    update_data = {
        "title": title,
        "description": description,
        "date": date
    }

    # Update image if provided
    if image:
        file_path = f"uploads/news/{image.filename}"
        with open(file_path, "wb") as buffer:
            shutil.copyfileobj(image.file, buffer)
        update_data["image_path"] = file_path

    await news_collection.update_one(
        {"_id": ObjectId(news_id)},
        {"$set": update_data}
    )

    return {"message": "News updated successfully"}


@app.delete("/news/{news_id}")
async def delete_news(news_id: str):
    news = await news_collection.find_one({"_id": ObjectId(news_id)})
    if not news:
        raise HTTPException(status_code=404, detail="News not found")

    # Delete image file
    if os.path.exists(news["image_path"]):
        os.remove(news["image_path"])

    await news_collection.delete_one({"_id": ObjectId(news_id)})
    return {"message": "News deleted"}


# ----------------------------
# Jobs APIs
# ----------------------------
@app.post("/jobs")
async def add_job(job: schemas.JobCreate):
    job_data = job.dict()
    result = await jobs_collection.insert_one(job_data)
    job_data["_id"] = str(result.inserted_id)
    return job_data


@app.get("/jobs")
async def get_jobs():
    jobs_list = []
    async for job in jobs_collection.find():
        job["_id"] = str(job["_id"])
        jobs_list.append(job)
    return jobs_list


@app.put("/jobs/{job_id}")
async def update_job(job_id: str, job: schemas.JobCreate):
    result = await jobs_collection.update_one(
        {"_id": ObjectId(job_id)},
        {"$set": job.dict()}
    )
    
    if result.modified_count == 0:
        raise HTTPException(status_code=404, detail="Job not found")
    
    return {"message": "Job updated successfully"}


@app.delete("/jobs/{job_id}")
async def delete_job(job_id: str):
    result = await jobs_collection.delete_one({"_id": ObjectId(job_id)})
    
    if result.deleted_count == 0:
        raise HTTPException(status_code=404, detail="Job not found")
    
    return {"message": "Job deleted"}


# ----------------------------
# Employee APIs
# ----------------------------
@app.get("/employees")
async def get_employees():
    """Get all employees (for portal display)"""
    employees_list = []
    async for employee in employees_collection.find():
        employee["_id"] = str(employee["_id"])
        employees_list.append(employee)
    return employees_list


@app.post("/employee/login")
async def employee_login(
    email: str = Form(...),
    password: str = Form(...),
    employee_id: int = Form(...)
):
    """Employee login - verify credentials"""
    employee = await employees_collection.find_one({
        "id": employee_id,
        "email": email
    })
    
    if not employee:
        raise HTTPException(status_code=401, detail="Invalid credentials")
    
    # Check password
    if employee["password_hash"] != password:
        raise HTTPException(status_code=401, detail="Invalid credentials")

    return {
        "message": "Login successful",
        "employee": {
            "id": employee["id"],
            "name": employee["name"],
            "email": employee["email"]
        }
    }


@app.post("/employee/forgot-password")
async def employee_forgot_password(employee_id: int = Form(...)):
    """Send password reset email to employee"""
    employee = await employees_collection.find_one({"id": employee_id})
    
    if not employee:
        raise HTTPException(status_code=404, detail="Employee not found")
    
    email = employee["email"]
    token = str(uuid.uuid4())
    reset_tokens[token] = {"email": email, "employee_id": employee_id, "type": "employee"}

    reset_link = f"http://localhost:5173/?token={token}&type=employee"

    send_email(
        to=email,
        subject="Reset Employee Password",
        body=f"""
Hello {employee["name"]},

Click the link below to reset your password:

{reset_link}

If you did not request this, please ignore this email.
"""
    )

    return {"message": "Reset link sent successfully"}


@app.post("/employee/reset-password")
async def employee_reset_password(
    token: str = Form(...),
    new_password: str = Form(...)
):
    """Reset employee password"""
    if token not in reset_tokens:
        raise HTTPException(status_code=400, detail="Invalid or expired token")

    token_data = reset_tokens[token]
    
    if token_data.get("type") != "employee":
        raise HTTPException(status_code=400, detail="Invalid token type")
    
    employee_id = token_data.get("employee_id")
    
    # Update password
    result = await employees_collection.update_one(
        {"id": employee_id},
        {"$set": {"password_hash": new_password}}
    )
    
    if result.modified_count == 0:
        raise HTTPException(status_code=404, detail="Employee not found")
    
    # Remove used token
    del reset_tokens[token]

    return {"message": "Password reset successful"}


# ----------------------------
# Attendance APIs
# ----------------------------
@app.post("/attendance/mark-in")
async def mark_attendance_in(
    employee_id: int = Form(...),
    latitude: float = Form(...),
    longitude: float = Form(...)
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
    employee = await employees_collection.find_one({"id": employee_id})
    if not employee:
        raise HTTPException(status_code=404, detail="Employee not found")
    
    # Check if attendance already marked today
    today = date.today()
    existing_attendance = await attendance_collection.find_one({
        "employee_id": employee_id,
        "date": today.isoformat()
    })
    
    if existing_attendance and existing_attendance.get("in_time"):
        raise HTTPException(status_code=400, detail="Attendance already marked for today")
    
    # Create or update attendance record
    if not existing_attendance:
        attendance_data = {
            "employee_id": employee_id,
            "date": today.isoformat(),
            "in_time": datetime.now().isoformat()
        }
        await attendance_collection.insert_one(attendance_data)
    else:
        await attendance_collection.update_one(
            {"_id": existing_attendance["_id"]},
            {"$set": {"in_time": datetime.now().isoformat()}}
        )
    
    return {
        "message": "Attendance marked successfully",
        "location": location_check["location_name"],
        "time": datetime.now().strftime("%I:%M %p")
    }


@app.post("/attendance/mark-out")
async def mark_attendance_out(
    employee_id: int = Form(...),
    latitude: float = Form(...),
    longitude: float = Form(...)
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
    employee = await employees_collection.find_one({"id": employee_id})
    if not employee:
        raise HTTPException(status_code=404, detail="Employee not found")
    
    # Find today's attendance record
    today = date.today()
    attendance = await attendance_collection.find_one({
        "employee_id": employee_id,
        "date": today.isoformat()
    })
    
    if not attendance or not attendance.get("in_time"):
        raise HTTPException(status_code=400, detail="Please mark IN time first")
    
    if attendance.get("out_time"):
        raise HTTPException(status_code=400, detail="Exit time already marked for today")
    
    # Update out time
    await attendance_collection.update_one(
        {"_id": attendance["_id"]},
        {"$set": {"out_time": datetime.now().isoformat()}}
    )
    
    return {
        "message": "Exit time marked successfully",
        "location": location_check["location_name"],
        "time": datetime.now().strftime("%I:%M %p")
    }


@app.get("/attendance/{employee_id}")
async def get_attendance(
    employee_id: int,
    month: Optional[int] = None,
    year: Optional[int] = None
):
    """Get attendance records for an employee"""
    
    query = {"employee_id": employee_id}
    
    # Apply date filters if provided
    if month and year:
        start_date = date(year, month, 1).isoformat()
        if month == 12:
            end_date = date(year + 1, 1, 1).isoformat()
        else:
            end_date = date(year, month + 1, 1).isoformat()
        
        query["date"] = {"$gte": start_date, "$lt": end_date}
    
    attendance_list = []
    async for attendance in attendance_collection.find(query).sort("date", -1):
        attendance["_id"] = str(attendance["_id"])
        attendance_list.append(attendance)
    
    return attendance_list
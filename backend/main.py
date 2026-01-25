from fastapi import FastAPI, Depends, UploadFile, File
from fastapi.staticfiles import StaticFiles
from sqlalchemy.orm import Session
import shutil
import os

from database import Base, engine, SessionLocal
import models, schemas

# ----------------------------
# FastAPI App
# ----------------------------
app = FastAPI()

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
@app.post("/news")
def add_news(
    title: str,
    description: str,
    image: UploadFile = File(...),
    db: Session = Depends(get_db)
):
    os.makedirs("uploads/news", exist_ok=True)

    file_path = f"uploads/news/{image.filename}"
    with open(file_path, "wb") as buffer:
        shutil.copyfileobj(image.file, buffer)

    news = models.News(
        title=title,
        description=description,
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
    job_db = models.Job(
        title=job.title,
        description=job.description
    )
    db.add(job_db)
    db.commit()
    db.refresh(job_db)
    return job_db

@app.get("/jobs")
def get_jobs(db: Session = Depends(get_db)):
    return db.query(models.Job).all()

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

# ----------------------------
# FastAPI App
# ----------------------------
app = FastAPI()

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
@app.post("/news")




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


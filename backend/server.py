from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from database.db import engine, Base
import os

Base.metadata.create_all(bind=engine)

app = FastAPI(
    title="Cal AI Backend",
    description="AI-powered calorie tracking API",
    version="1.0.0"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

from routers import auth, users, meals

app.include_router(auth.router, prefix="/api")
app.include_router(users.router, prefix="/api")
app.include_router(meals.router, prefix="/api")

@app.get("/api/health")
async def health():
    return {"status": "ok", "message": "Cal AI Backend is running"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8001)

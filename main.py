"""
Gita Mentor AI - FastAPI Backend
Main application entry point
"""

from fastapi import FastAPI, HTTPException, Depends, BackgroundTasks
from fastapi.middleware.cors import CORSMiddleware
from fastapi.middleware.gzip import GZipMiddleware
from contextlib import asynccontextmanager
import uvicorn
import logging
from dotenv import load_dotenv
import os

from api.chat import router as chat_router
from api.verses import router as verses_router
from api.users import router as users_router
from api.tasks import router as tasks_router
from services.mongodb import connect_mongodb, close_mongodb
from core.rag_engine import RAGEngine

load_dotenv()

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# Global RAG engine instance
rag_engine: RAGEngine = None


@asynccontextmanager
async def lifespan(app: FastAPI):
    """Startup and shutdown lifecycle"""
    global rag_engine
    logger.info("🪷 Starting Gita Mentor AI...")

    # Connect to MongoDB
    await connect_mongodb()
    logger.info("✅ MongoDB connected")

    # Initialize RAG Engine (loads FAISS index)
    rag_engine = RAGEngine()
    await rag_engine.initialize()
    logger.info("✅ RAG Engine initialized with FAISS index")

    # Store in app state
    app.state.rag_engine = rag_engine

    logger.info("🪷 Gita Mentor AI is ready!")
    yield

    # Cleanup
    await close_mongodb()
    logger.info("👋 Gita Mentor AI shut down")


app = FastAPI(
    title="Gita Mentor AI",
    description="AI-powered spiritual mentor based on the Bhagavad Gita",
    version="1.0.0",
    lifespan=lifespan
)

# CORS Middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=os.getenv("CORS_ORIGINS", "http://localhost:3000").split(","),
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
app.add_middleware(GZipMiddleware, minimum_size=1000)

# Register routers
app.include_router(chat_router, prefix="/api/chat", tags=["Chat"])
app.include_router(verses_router, prefix="/api/verses", tags=["Verses"])
app.include_router(users_router, prefix="/api/users", tags=["Users"])
app.include_router(tasks_router, prefix="/api/tasks", tags=["Tasks"])


@app.get("/")
async def root():
    return {
        "message": "🪷 Gita Mentor AI - Ancient Wisdom, Modern Life",
        "version": "1.0.0",
        "status": "running"
    }


@app.get("/health")
async def health_check():
    return {
        "status": "healthy",
        "rag_engine": "initialized" if app.state.rag_engine else "not initialized"
    }


if __name__ == "__main__":
    uvicorn.run(
        "main:app",
        host="0.0.0.0",
        port=int(os.getenv("PORT", 8000)),
        reload=os.getenv("ENV", "development") == "development",
        log_level="info"
    )

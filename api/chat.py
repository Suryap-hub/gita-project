from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from typing import Optional
import os
import google.generativeai as genai

router = APIRouter()

GITA_SYSTEM_PROMPT = """You are Gita Mentor, a wise and compassionate spiritual guide deeply versed in the Bhagavad Gita. 
You help people navigate modern life challenges using timeless wisdom from the Gita.

Guidelines:
- Reference specific verses (chapter:verse) when relevant
- Use a warm, compassionate, and wise tone
- Connect ancient wisdom to modern life situations
- Keep responses concise but insightful (2-4 paragraphs)
- If someone is struggling, offer comfort before advice
- Use Sanskrit terms sparingly, always with English explanation
"""

class ChatRequest(BaseModel):
    message: str
    user_id: Optional[str] = None

class ChatResponse(BaseModel):
    response: str
    user_id: Optional[str] = None

# Initialize Gemini model
def get_gemini_model():
    api_key = os.getenv("GEMINI_API_KEY")
    if not api_key:
        raise HTTPException(status_code=500, detail="GEMINI_API_KEY not configured")
    
    model_name = os.getenv("GEMINI_MODEL", "gemini-1.5-flash")
    genai.configure(api_key=api_key)
    return genai.GenerativeModel(
        model_name,
        system_instruction=GITA_SYSTEM_PROMPT
    )

@router.post("/ask", response_model=ChatResponse)
async def ask_gita_mentor(request: ChatRequest):
    """Chat with Gita Mentor powered by Gemini"""
    try:
        model = get_gemini_model()
        response = model.generate_content(request.message)
        return ChatResponse(
            response=response.text,
            user_id=request.user_id
        )
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

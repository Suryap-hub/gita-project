import os
import logging
import google.generativeai as genai

logger = logging.getLogger(__name__)

class RAGEngine:
    """RAG Engine for processing queries using Google Gemini"""
    
    def __init__(self):
        """Initialize the RAG engine with Gemini"""
        self.api_key = os.getenv("GEMINI_API_KEY")
        self.model_name = os.getenv("GEMINI_MODEL", "gemini-1.5-flash")
        self.model = None
    
    async def initialize(self):
        """Initialize the RAG engine and load Gemini model"""
        if not self.api_key:
            logger.warning("GEMINI_API_KEY not set — RAG Engine will not be available")
            return
        
        try:
            genai.configure(api_key=self.api_key)
            self.model = genai.GenerativeModel(self.model_name)
            logger.info(f"RAG Engine initialized successfully with model: {self.model_name}")
        except Exception as e:
            logger.error(f"Failed to initialize RAG Engine: {e}")
    
    async def query(self, prompt: str) -> str:
        """Query the Gemini model"""
        if not self.model:
            raise RuntimeError("RAG Engine not initialized")
        
        response = self.model.generate_content(prompt)
        return response.text

from fastapi import APIRouter

router = APIRouter()

@router.get("/")
async def get_verses():
    """Get Gita verses"""
    return {"message": "Gita verses endpoint"}

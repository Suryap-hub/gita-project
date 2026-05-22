from fastapi import APIRouter

router = APIRouter()

@router.get("/")
async def get_tasks():
    """Get tasks"""
    return {"message": "Tasks endpoint"}

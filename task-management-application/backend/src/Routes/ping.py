from fastapi import APIRouter


router  = APIRouter()

@router.get('/ping')
def get_health():
    return {"message": "Welcome to the task manager api client from files"}
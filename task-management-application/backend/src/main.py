from fastapi import FastAPI
from .config import APP_NAME
from .Routes import ping


app = FastAPI(title=APP_NAME)


app.include_router(ping.router)
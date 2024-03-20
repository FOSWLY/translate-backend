from fastapi import APIRouter

from routes.endpoints import docs, health, translate

api_router = APIRouter()
api_router.include_router(docs.router)
api_router.include_router(translate.router, tags = ['Translate'])
api_router.include_router(health.router, tags = ['Health'])
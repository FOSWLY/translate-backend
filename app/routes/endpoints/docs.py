from fastapi import APIRouter
from fastapi.responses import HTMLResponse

from core.settings import get_settings

from openapipages import Scalar, SwaggerUI, ReDoc

router = APIRouter()
settings = get_settings()


@router.get('/swaggerui', response_class=HTMLResponse, include_in_schema=False)
async def get_swaggerui() -> str:
    return SwaggerUI(title="Swagger UI").render()

@router.get('/docs', response_class=HTMLResponse, include_in_schema=False)
async def get_scalar() -> str:
    return Scalar(title="Scalar UI").render()

@router.get('/redoc', response_class=HTMLResponse, include_in_schema=False)
async def get_redoc() -> str:
    return ReDoc(title="ReDoc UI").render()
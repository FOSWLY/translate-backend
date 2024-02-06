from fastapi import FastAPI
from fastapi.staticfiles import StaticFiles
from fastapi.middleware.cors import CORSMiddleware
from fastapi.openapi.utils import get_openapi
from hyperdx.opentelemetry import configure_opentelemetry, HyperDXOptions

from core.settings import get_settings
from core.logger import init_logging
from routes import api_router

settings = get_settings()
tags_meta = [
    {
        'name': 'Translate',
        'description': 'Interaction with Yandex Translate API without any authorization or restrictions'
    },
    {
        'name': 'Health',
        'description': 'Health of our servers'
    }
]

def custom_openapi():
    if app.openapi_schema:
        return app.openapi_schema
    openapi_schema = get_openapi(
        title=settings.app_name,
        version=settings.app_version,
        description=settings.app_desc,
        license_info = {
            "name": settings.app_license,
        },
        contact = {
            "name": "Developer",
            "url": settings.app_developer_url,
            "email": settings.app_developer_email
        },
        routes = app.routes,
        tags = tags_meta
    )
    openapi_schema["info"]["x-logo"] = {
        "url": "/static/assets/logo.svg",
        "altText": "logo"
    }
    app.openapi_schema = openapi_schema
    return app.openapi_schema


app = FastAPI(openapi_url = '/openapi.json', docs_url = '/docs', redoc_url = '/redoc')
app.mount('/static', StaticFiles(directory = 'static'), name = 'static')
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
app.openapi = custom_openapi

def on_startup():
    init_logging()
    if settings.hyperdx_api_key:
        configure_opentelemetry(
            HyperDXOptions(
                service_name = settings.hyperdx_service_name,
                service_version = settings.app_version,
                apikey = settings.hyperdx_api_key
            )
        )

app.include_router(api_router)
app.add_event_handler('startup', on_startup)
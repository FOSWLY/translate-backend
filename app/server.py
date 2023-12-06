from core.app import app
from core.logger import init_logging
from routes import api_router



async def start():
    app.include_router(api_router)
    init_logging()
    return app
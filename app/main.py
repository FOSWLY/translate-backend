import asyncio
import uvicorn

from core.settings import get_settings
from server import start

settings = get_settings()

async def main():
    app = await start()
    config = uvicorn.Config(
        app,
        host=settings.address,
        port=settings.port,
        log_level=settings.log_level,
    )
    server = uvicorn.Server(config)
    return await server.serve()

if __name__ == '__main__':
    asyncio.run(main())
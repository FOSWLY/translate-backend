import logging
import multiprocessing
from granian.server import Granian
from granian.constants import Interfaces

from core.settings import get_settings

settings = get_settings()

def count_workers():
    return (multiprocessing.cpu_count() * 2) + 1

if __name__ == '__main__':
    Granian(
        "core.app:app",
        address=settings.address,
        port=settings.port,
        interface=Interfaces.ASGI,
        log_level=logging.getLevelName(settings.log_level).lower(),
        threads=count_workers(),
        threading_mode=settings.threading_mode
    ).serve()
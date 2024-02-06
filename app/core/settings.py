import logging

from functools import lru_cache
from pydantic_settings import BaseSettings, SettingsConfigDict
from granian.constants import ThreadModes


class Settings(BaseSettings):
    # - server section -
    port: int = 3313
    address: str = '0.0.0.0'
    threading_mode: ThreadModes = ThreadModes.runtime # experiment on your server, it may increase/decrease performance

    # - logging section -
    log_level: int = logging.INFO # level of logs (DEBUG, INFO, WARNING, ERROR, CRITICAL)
    log_save: bool = True # save logs to file
    log_rich_formatter: bool = True # format logs with rich lib
    log_max_size: int = 10 # maximum log size in megabytes
    log_max_saved_log: int = 7 # count of saved log from running instance

    # - hyperdx telemetry -
    hyperdx_api_key: str = "" # hyperdx.io
    hyperdx_service_name: str = "foswly-translate-backend"

    # - app section -
    app_name: str = '[FOSWLY] Translate'
    app_desc: str = '[FOSWLY] Translate is Free Yandex Translate API without any authorization or restrictions.'
    app_version: str = '1.0.3'
    app_license: str = 'MIT'
    app_developer_url: str = 'https://github.com/FOSWLY/translate-backend'
    app_developer_email: str = 'me@toil.cc'

    model_config = SettingsConfigDict(env_file='.env')

@lru_cache
def get_settings() -> Settings:
    return Settings()
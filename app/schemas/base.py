from pydantic import BaseModel, Field


class BaseYandexResponse(BaseModel):
    code: int = Field(
        examples=[400, 502, 413],
        description='Yandex server status code'
    )
from pydantic import BaseModel, Field

from schemas.base import BaseYandexResponse


class DetectRequest(BaseModel):
    text: str = Field(
        examples=['scope', 'Hello! How are you?'],
        description='Text to detect language',
        min_length=1,
        max_length=10000
    )


class DetectResponse(BaseYandexResponse):
    lang: str = Field(
        examples=['en', '', 'kk', 'ru'],
        description='Language code'
    )
from pydantic import BaseModel, Field

from schemas.base import BaseYandexResponse


class TranslateRequest(BaseModel):
    lang: str = Field(
        examples=['en-ru', 'kk-ru', 'uk-ru'],
        description='Language pair codes (original language - translated language)'
    )
    text: str = Field(
        examples=['scope', 'Hello! How are you?'],
        description='Text to translate',
        min_length=1,
        max_length=10000
    )


class TranslateSuccessResponse(BaseYandexResponse):
    lang: str = Field(
        examples=['en-ru', 'kk-ru', 'uk-ru'],
        description='Language pair codes (original language - translated language)'
    )
    text: list[str] = Field(
        examples=[['масштаб'], ['Привет! Как ты?']],
        description='Translated text'
    )


class TranslateErrorResponse(BaseYandexResponse):
    code: int = Field(
        examples=[400]
    )
    message: str = Field(
        examples=['Invalid parameter: lang', 'Invalid parameter: text'],
        description='Description of error'
    )
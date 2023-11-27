from pydantic import BaseModel, Field


class GetLangsResponse(BaseModel):
    dirs: list[str] = Field(
        examples=[['az-ru', 'kk-ru', 'bg-ru', 'uk-kk']],
        description='List of language code pairs'
    )
import logging
from fastapi import APIRouter


from api.translate import YandexTranslate
from schemas.translate import TranslateRequest, TranslateSuccessResponse, TranslateErrorResponse
from schemas.detect import DetectRequest, DetectResponse
from schemas.get_langs import GetLangsResponse

router = APIRouter()
logger = logging.getLogger(__name__)


@router.post('/translate')
async def translate_text(body: TranslateRequest) -> TranslateSuccessResponse|TranslateErrorResponse:
    return await YandexTranslate().translate(body.text, body.lang)


@router.post('/detect')
async def detect_lang(body: DetectRequest) -> DetectResponse:
    res = await YandexTranslate().detect(body.text)
    if res['lang'] == '':
        logger.info(f'Unknown language detected. Entered text: "{body.text}".')
    return res

@router.get('/langs')
async def get_langs() -> GetLangsResponse:
    return await YandexTranslate().get_langs()
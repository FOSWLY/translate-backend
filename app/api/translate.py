import logging
import httpx

from fastapi import HTTPException, status

from core.settings import get_settings

settings = get_settings()


class YandexTranslate:
    def __init__(self) -> None:
        self.logger = logging.getLogger(__name__)
        self.headers: dict = {
            "Content-Type": "application/x-www-form-urlencoded",
            "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/116.0.5845.660 YaBrowser/23.9.5.660 Yowser/2.5 Safari/537.36",
            "Referer": f'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
            "Origin": f'https://www.youtube.com',
            "pragma": "no-cache",
            "cache-control": "no-cache"
        }
        self.srv = 'browser_video_translation' # Superior yandex security 2023 xd

    async def request(self, endpoint: str, params: dict):
        async with httpx.AsyncClient(http2=True) as client:
            r = await client.post(
                f'https://browser.translate.yandex.net/api/v1/tr.json/{endpoint}',
                params = params,
                headers = self.headers,
                data = {
                    'maxRetryCount': 2,
                    'fetchAbortTimeout': 500
                }
            )
            self.logger.debug(f'POST /api/v1/tr.json/{endpoint}: {r.status_code}')
            if r.status_code not in [status.HTTP_200_OK, status.HTTP_400_BAD_REQUEST, status.HTTP_413_REQUEST_ENTITY_TOO_LARGE] :
                self.logger.error(f'API answer: {r.read()}')
                raise HTTPException(
                    status_code=status.HTTP_503_SERVICE_UNAVAILABLE,
                    detail='Unable to access Yandex API',
                )
            return r.json()

    async def translate(self, text: str, lang_pair: str = 'en-ru'):
        return await self.request('translate', {
            'srv': self.srv,
            'lang': lang_pair,
            'text': text
        })

    async def detect(self, text: str):
        return await self.request('detect', {
            'srv': self.srv,
            'text': text
        })

    async def get_langs(self):
        return await self.request('getLangs', {
            'srv': self.srv,
        })
## [FOSWLY] Translate Backend

[![Python Version](https://img.shields.io/badge/Python-3.11-blue?logo=python&style=for-the-badge)](https://www.python.org/)
[![GitHub Stars](https://img.shields.io/github/stars/FOSWLY/translate-backend?logo=github&style=for-the-badge)](https://github.com/FOSWLY/translate-backend/stargazers)
[![GitHub Issues](https://img.shields.io/github/issues/FOSWLY/translate-backend?style=for-the-badge)](https://github.com/FOSWLY/translate-backend/issues)
[![Current Version](https://img.shields.io/github/v/release/FOSWLY/translate-backend?style=for-the-badge)](https://github.com/FOSWLY/translate-backend)
[![GitHub License](https://img.shields.io/github/license/FOSWLY/translate-backend?style=for-the-badge)](https://github.com/FOSWLY/translate-backend/blob/master/LICENSE)

**[FOSWLY] Translate Backend** - cервер, который реализует Yandex Translate API. Сервер не содержит никакой авторизации и может быть использован для ваших проектов.

## 📝 Функционал
- Перевод текста
- Определение языка
- Получение списка доступных языков

## 📦 Деплой
1. Установите Python 3.11 (на других версиях не тестировался)
2. Клонируйте репозиторий
3. Установите зависимости: `pip install -r requirements.txt`
4. Заполните конфиг: `app/core/settings.py`
5. Запустите сервер: `python3 -OO main.py`

## 📖 Кому это будет полезно
1. Если вы всегда хотите иметь актуальный рабочий способ перевода и определения текста
2. Если у вас заблокированы сервера Yandex

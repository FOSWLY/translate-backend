## [FOSWLY] Translate Backend

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

1.  Установите Bun
2.  Клонируйте репозиторий
3.  Установите зависимости: `bun install`
4.  Заполните конфиг: `src/config.ts`
5.  Запустите сервер: `bun start`

Если вы хотите использовать PM2:

1. Установите зависимости:

```bash
bun install -g pm2 && pm2 install pm2-logrotate
```

2. Запустите сервер

```bash
pm2 start ecosystem.config.js
```

## 📖 Кому это будет полезно

1. Если вы всегда хотите иметь актуальный рабочий способ перевода и определения текста
2. Если у вас заблокированы сервера Yandex

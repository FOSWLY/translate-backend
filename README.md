## [FOSWLY] Translate Backend

[![GitHub Stars](https://img.shields.io/github/stars/FOSWLY/translate-backend?logo=github&style=for-the-badge)](https://github.com/FOSWLY/translate-backend/stargazers)
[![GitHub Issues](https://img.shields.io/github/issues/FOSWLY/translate-backend?style=for-the-badge)](https://github.com/FOSWLY/translate-backend/issues)
[![Current Version](https://img.shields.io/github/v/release/FOSWLY/translate-backend?style=for-the-badge)](https://github.com/FOSWLY/translate-backend)
[![GitHub License](https://img.shields.io/github/license/FOSWLY/translate-backend?style=for-the-badge)](https://github.com/FOSWLY/translate-backend/blob/master/LICENSE)

**[FOSWLY] Translate Backend** - cервер, реализующий унифицированные конечные точки для провайдеров, которые поддерживаются в библиотеке [@toil/translate](https://github.com/FOSWLY/translate).

## 📝 Функционал

- Перевод текста
- Определение языка
- Получение списка доступных языков

## 📋 Список провайдеров

Список поддерживаемых провайдеров:

- Yandex (YandexBrowser, YandexCloud, YandexTranslate)
- MSEdge

Чтобы указать какой-то конкретный провайдер вам необходимо передать параметр `service`, соответствующий необходимому сервису. У разных провайдеров разные лимиты, учитывайте это при запросе.

## 🛸 Версионирование API

Если вы хотите использовать несколько версий сервера переводов, то вам необходимо реализовать свое версионирование через ваш веб-сервер.

Наш сервер [translate.toil.cc](https://translate.toil.cc) поддерживает версионирование с помощью заголовка `X-FOSWLY-API`. Доступные версии API:

1. `Next` - использовать всегда самую последнюю версию API (может ломать совместимость)
2. `2024-11-27` (поддерживается) - использовать версию, которая совместима с новыми ответами из 2.1.0.
3. без указания версии (устаревшая) - использовать устаревшую версию 2.0, которая будет удалена через N время. После удаления, на место стандартной версии встанет `2024-11-27`

## 📦 Деплой

1. Установите [Bun](https://bun.sh/)
2. Клонируйте репозиторий:

```bash
git clone https://github.com/FOSWLY/translate-backend
```

3. Установите зависимости

```bash
bun install
```

1. Переименуйте `.example.env` в `.env` и установите необходимые поля
2. Запустите сервер

```bash
bun start
```

Если вы хотите использовать PM2:

1. Установите зависимости:

```bash
bun install -g pm2-beta && pm2 install pm2-logrotate
```

2. Запустите сервер

```bash
pm2 start ecosystem.config.json
```

## 📖 Кому это будет полезно

1. Если вы всегда хотите иметь актуальный рабочий способ перевода и определения текста
2. Если вы хотите использовать бесплатный перевод от поддерживаемых провайдеров с другим языком программирования
3. Если у вас заблокированы сервера Yandex

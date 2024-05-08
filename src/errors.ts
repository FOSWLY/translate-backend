export class InternalServerError extends Error {
  constructor() {
    super("Internal server error (see logs)");
  }
}

export class UnableAccessYandexAPI extends Error {
  constructor() {
    super("Unable to access Yandex API");
  }
}

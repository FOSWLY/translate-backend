export class LibreTransalteDisabledError extends Error {
  constructor() {
    super("LibreTranslate is disabled on this server");
  }
}

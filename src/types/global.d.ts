declare module "bun" {
  interface Env {
    SERVICE_HOST: string;
    SERVICE_PORT: number;
    APP_NAME: string;
    APP_DESC: string;
    APP_CONTACT_EMAIL: string;
    LOKI_HOST: string;
    LOKI_USER: string;
    LOKI_PASSWORD: string;
    LOKI_LABEL: string;
    NODE_ENV: string;
  }
}

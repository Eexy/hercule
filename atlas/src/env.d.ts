declare namespace NodeJS {
  export interface ProcessEnv {
    JWT_KEY: string;
    PORT: string;
    CLIENT_ID: string;
    CLIENT_SECRET: string;
  }
}

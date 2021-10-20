export const DB = {
  URI: `mongodb://db:${process.env.DB_PORT}/?authSource=admin`,
  NAME: process.env.DB_NAME,
  USER: process.env.DB_USER,
  PASS: process.env.DB_PASS,
};

export const DB_SCHEMA_STRING_REQUIRED = {
  type: String,
  required: true,
};

export enum DB_FILE_NAMES {
  INFO = 'info'
}

export enum DB_MODEL_NAMES {
  LOGO = 'Logo',
}

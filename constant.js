import "dotenv/config";
const PORT = process.env.port;
const MODE = process.env.MODE;
const DB_LOCAL_URL = process.env.DB_LOCAL_URL;
const DB_PRODUCTION_URL = process.env.DB_PRODUCTION_URL;

const ACCEESS_TOKEN_SECRET = process.env.ACCEESS_TOKEN_SECRET;
const ACCEESS_TOKEN_EXPIRED = process.env.ACCEESS_TOKEN_EXPIRED;

export {
  PORT,
  MODE,
  DB_LOCAL_URL,
  DB_PRODUCTION_URL,
  ACCEESS_TOKEN_SECRET,
  ACCEESS_TOKEN_EXPIRED,
};

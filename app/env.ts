import dotenv from 'dotenv';

dotenv.config();

const ACCESS_TOKEN_LIFE: string = process.env.ACCESS_TOKEN_LIFE ?? '';
const ACCESS_TOKEN_SECRET: string = process.env.ACCESS_TOKEN_SECRET ?? '';
const DATABASE_URL: string = process.env.DATABASE_URL ?? '';
const BASE_URL: string = process.env.BASE_URL ?? '';

export {
  ACCESS_TOKEN_LIFE,
  ACCESS_TOKEN_SECRET,
  DATABASE_URL,
  BASE_URL
}
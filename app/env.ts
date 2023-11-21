import dotenv from 'dotenv';

dotenv.config();

const JWT_EXPIRE: string = process.env.JWT_EXPIRE ?? '';
const JWT_SECRET: string = process.env.JWT_SECRET ?? '';
const DATABASE_URL: string = process.env.DATABASE_URL ?? '';
const BASE_URL: string = process.env.BASE_URL ?? '';

export {
  JWT_EXPIRE,
  JWT_SECRET,
  DATABASE_URL,
  BASE_URL
}
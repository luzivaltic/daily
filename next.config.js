/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    JWT_EXPIRE: process.env.JWT_EXPIRE,
    JWT_SECRET: process.env.JWT_SECRET,
    DATABASE_URL: process.env.DATABASE_URL,
    BASE_URL: process.env.BASE_URL
  }
}

module.exports = nextConfig

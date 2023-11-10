/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    ACCESS_TOKEN_LIFE: process.env.ACCESS_TOKEN_LIFE,
    ACCESS_TOKEN_SECRET: process.env.ACCESS_TOKEN_SECRET,
    DATABASE_URL: process.env.DATABASE_URL,
    BASE_URL: process.env.BASE_URL
  }
}

module.exports = nextConfig

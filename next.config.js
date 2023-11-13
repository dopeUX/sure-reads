/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    images:{
        domains:['books.google.com']
    },
    env: {
      SERVICE_URL: process.env.SERVICE_URL,
    }
  }
module.exports = nextConfig

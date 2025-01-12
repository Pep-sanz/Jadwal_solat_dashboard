/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    API_URL: process.env.NEXT_PUBLIC_API_URL,
    SSO_URL: process.env.NEXT_PUBLIC_SSO_URL,
    ACCESS_TOKEN_NAME: process.env.NEXT_PUBLIC_ACCESS_TOKEN_NAME,
    REFRESH_TOKEN_NAME: process.env.NEXT_PUBLIC_REFRESH_TOKEN_NAME,
  },
};

export default nextConfig;

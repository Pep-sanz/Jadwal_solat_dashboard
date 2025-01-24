/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    API_URL: process.env.NEXT_PUBLIC_API_URL,
    SSO_URL: process.env.NEXT_PUBLIC_SSO_URL,
    ACCESS_TOKEN_NAME: process.env.NEXT_PUBLIC_ACCESS_TOKEN_NAME,
    REFRESH_TOKEN_NAME: process.env.NEXT_PUBLIC_REFRESH_TOKEN_NAME
  },
  async redirects() {
    return [
      {
        source: '/', // Semua path
        destination: '/mosque', // Arahkan ke /mosque
        permanent: true // Atur true jika ini redirect permanen (status 308)
      }
    ];
  }
};

export default nextConfig;

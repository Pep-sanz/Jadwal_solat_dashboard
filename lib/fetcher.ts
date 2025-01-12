'use client';
import axios from 'axios';
import * as Cookie from 'cookies-js';

// Ambil token dari cookie
const accessToken = Cookie.get(
  process.env.NEXT_PUBLIC_ACCESS_TOKEN_NAME || 'accessToken',
);
const refreshToken = Cookie.get(
  process.env.NEXT_PUBLIC_REFRESH_TOKEN_NAME || 'refreshToken',
);

// Inisialisasi Axios Instance untuk fetcherAuth
const fetcherAuth = axios.create({
  baseURL: process.env.NEXT_PUBLIC_SSO_URL,
  withCredentials: false, // Jika menggunakan cookie lintas domain
  headers: {
    'Content-Type': 'application/json', // Tetapkan tipe konten eksplisit
  },
});

fetcherAuth.interceptors.request.use(
  (config) => {
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => Promise.reject(error),
);

fetcherAuth.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // Jika terjadi error 401 dan ada refresh token, lakukan refresh
    if (
      error.response?.status === 401 &&
      refreshToken &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;

      try {
        const { data } = await axios.post(
          `${process.env.NEXT_PUBLIC_SSO_URL}/token/refresh/`,
          {
            refresh: refreshToken,
          },
        );

        const newAccessToken = data.access;
        const newRefreshToken = data.refresh;

        Cookie.set(
          process.env.NEXT_PUBLIC_ACCESS_TOKEN_NAME || 'accessToken',
          newAccessToken,
        );

        Cookie.set(
          process.env.NEXT_PUBLIC_REFRESH_TOKEN_NAME || 'refreshToken',
          newRefreshToken,
        );

        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;

        return fetcherAuth(originalRequest);
      } catch (refreshError) {
        Cookie.expire(
          process.env.NEXT_PUBLIC_ACCESS_TOKEN_NAME || 'accessToken',
        );
        Cookie.expire(
          process.env.NEXT_PUBLIC_REFRESH_TOKEN_NAME || 'refreshToken',
        );
        window.location.href = '/sign-in';
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  },
);

// Inisialisasi Axios Instance untuk fetcher
const fetcher = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  withCredentials: false,
  headers: {
    'Content-Type': 'application/json', // Tetapkan tipe konten eksplisit
  },
});

fetcher.interceptors.request.use(
  (config) => {
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => Promise.reject(error),
);

// Tambahkan Interceptor untuk respon (response) di fetcher
fetcher.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // Jika terjadi error 401 dan ada refresh token, lakukan refresh
    if (
      error.response?.status === 401 &&
      refreshToken &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;

      try {
        const { data } = await axios.post(
          `${process.env.NEXT_PUBLIC_SSO_URL}/token/refresh/`,
          {
            refresh: refreshToken,
          },
        );

        const newAccessToken = data.access;
        const newRefreshToken = data.refresh;

        // Perbarui token di cookie
        Cookie.set(
          process.env.NEXT_PUBLIC_ACCESS_TOKEN_NAME || 'accessToken',
          newAccessToken,
        );

        Cookie.set(
          process.env.NEXT_PUBLIC_REFRESH_TOKEN_NAME || 'refreshToken',
          newRefreshToken,
        );

        // Perbarui header Authorization pada permintaan awal
        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;

        location.reload();
        // Lakukan ulang permintaan dengan token baru
        return fetcher(originalRequest);
      } catch (refreshError) {
        // Jika refresh token gagal, hapus token dan redirect ke halaman login
        Cookie.expire(
          process.env.NEXT_PUBLIC_ACCESS_TOKEN_NAME || 'accessToken',
        );
        Cookie.expire(
          process.env.NEXT_PUBLIC_REFRESH_TOKEN_NAME || 'refreshToken',
        );
        window.location.href = '/sign-in';
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  },
);

export { fetcherAuth, fetcher };

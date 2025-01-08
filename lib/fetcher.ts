'use client';
import axios from 'axios';
import Cookie from 'cookies-js';

const fetcher = axios.create({
  baseURL: process.env.API_URL,
});

if (typeof window !== 'undefined') {
  const myCookie = Cookie.get(process.env.COOKIE_NAME as string);

  if (myCookie) {
    fetcher.defaults.headers.common['Authorization'] = `Bearer ${myCookie}`;
  }
}
export { fetcher };

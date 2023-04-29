import * as dotenv from 'dotenv';
let isTest = process.env.NODE_ENV === 'test';
dotenv.config();

export const env = {
    APP_PORT: process.env.APP_PORT,
    APP_ENV: process.env.APP_ENV,
    BACKEND_URL: process.env.BACKEND_URL,
    DATABASE: {
        DATABASE_CONNECT: process.env.DATABASE_CONNECT,
        DATABASE_PORT: Number(process.env.DATABASE_PORT || 27018),
        DATABASE_NAME: process.env.DATABASE_NAME,
        DATABASE_USER: process.env.DATABASE_USER,
        DATABASE_PASSWORD: process.env.DATABASE_PASSWORD
    },
    REDIS: {
        HOST: process.env.REDIS_HOST || 'localhost',
        PORT: Number(process.env.REDIS_PORT || 6379),
        USER: process.env.REDIS_USER,
        PASS: process.env.REDIS_PASS
    },
    ROOT_PATH: process.cwd() + (isTest ? '/src' : ''),
    JWT: {
        JWT_SECRET: process.env.JWT_SECRET,
        JWT_EXPIRE: process.env.JWT_EXPIRE || '1d',
        JWT_EXPIRE_REMEMBER: process.env.JWT_EXPIRE_REMEMBER || '30d',
        JWT_SIGN_UP_SECRET: process.env.JWT_SIGN_UP_SECRET,
        JWT_SIGN_UP_EXPIRE: process.env.JWT_SIGN_UP_EXPIRE || '1m',
        JWT_REFRESH_SECRET: process.env.JWT_REFRESH_SECRET,
        JWT_REFRESH_EXPIRE: process.env.JWT_REFRESH_EXPIRE || '7d'
    },
    IMAGEKIT: {
        IMAGEKIT_PUBLIC_KEY: process.env.IMAGEKIT_PUBLIC_KEY,
        IMAGEKIT_PRIVATE_KEY: process.env.IMAGEKIT_PRIVATE_KEY,
        IMAGEKIT_URL_ENDPOINT: process.env.IMAGEKIT_URL_ENDPOINT
    },
    SALT_ROUND: 10,
    WHITELIST_DOMAINS: (process.env.WHITELIST_DOMAINS || 'localhost').split(',')
};

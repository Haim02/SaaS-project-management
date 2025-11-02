import dotenv from "dotenv";
dotenv.config();

export const env = {
    PORT: process.env.PORT || "3000",
    MONGO_URI: process.env.MONGO_URI!,
    MONGO_PASSWORD: process.env.MONGO_PASSWORD || "951753",
    JWT_SECRET: process.env.JWT_SECRET!,
    JWT_EXPIRES_IN: process.env.JWT_EXPIRES_IN || "1d",
    COOKIE_NAME: process.env.COOKIE_NAME || 'access_token',
    CORS_ORIGIN: process.env.CORS_ORIGIN || "*",
    NODE_ENV: process.env.NODE_ENV || "development",
    GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
    GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET,
    GOOGLE_REDIRECT_URI: process.env.GOOGLE_REDIRECT_URI,
    FRONTEND_SUCCESS_REDIRECT: process.env.FRONTEND_SUCCESS_REDIRECT || undefined,
    FRONTEND_FAILURE_REDIRECT: process.env.FRONTEND_FAILURE_REDIRECT || undefined
};

if (!env.MONGO_URI || !env.JWT_SECRET) {
    throw new Error("Missing required env vars (MONGO_URI / JWT_SECRET)");
}

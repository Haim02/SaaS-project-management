# frontend/Dockerfile
FROM node:20-alpine AS build
WORKDIR /app

# התקנת תלויות
COPY package*.json ./
RUN npm ci

# קוד האפליקציה
COPY . .

# אם אתה משתמש במשתני Vite (למשל VITE_API_URL) – אפשר להעביר כ-ARG
ARG VITE_API_URL
ENV VITE_API_URL=${VITE_API_URL}

# Build
RUN npm run build

# התוצר הסופי: /app/dist


# FROM node:20-alpine AS be-builder
# WORKDIR /app


# COPY server/package*.json ./
# RUN npm ci

# COPY server/tsconfig.json ./
# COPY server/src ./src
# RUN npm run build

# FROM node:20-alpine AS runner
# WORKDIR /app
# ENV NODE_ENV=production
# ENV PORT=3000

# COPY server/package.json ./
# COPY server/package*.json ./
# COPY server/package-lock.json ./
# RUN npm ci --omit=dev

# COPY --from=be-builder /app/dist ./dist


# EXPOSE 3000
# CMD ["node", "dist/index.js"]




# ---------- Build FE ----------
FROM node:20-alpine AS fe-build
WORKDIR /fe
COPY frontend/package*.json ./
COPY frontend/package-lock.json ./
RUN npm ci
COPY frontend/. .
ARG VITE_API_URL=/api
ENV VITE_API_URL=${VITE_API_URL}
RUN npm run build
# התוצר: /fe/dist

# ---------- Build BE ----------
FROM node:20-alpine AS be-build
WORKDIR /app
COPY server/package*.json ./
RUN npm ci
COPY server/tsconfig.json ./
COPY server/ .
RUN npm run build
# התוצר: /app/dist

# ---------- Runtime ----------
FROM node:20-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production
ENV PORT=3000

# תלויות ריצה בלבד
COPY server/package*.json ./
COPY server/package.json ./
COPY server/package-lock.json ./
RUN npm ci --omit=dev

# קבצי השרת
COPY --from=be-build /app/dist ./dist

# סטטי של ה-frontend בתוך /app/public
COPY --from=fe-build /fe/dist ./public

EXPOSE 3000
CMD ["node", "dist/index.js"]

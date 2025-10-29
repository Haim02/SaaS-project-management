
FROM node:20-alpine AS be-builder
WORKDIR /app


COPY server/package*.json ./
RUN npm ci

COPY server/tsconfig.json ./
COPY server/src ./src
RUN npm run build

FROM node:20-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production
ENV PORT=3000

COPY server/package.json ./
COPY server/package*.json ./
COPY server/package-lock.json ./
RUN npm ci --omit=dev

COPY --from=be-builder /app/dist ./dist


EXPOSE 3000
CMD ["node", "dist/index.js"]
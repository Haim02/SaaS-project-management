# ---------- build FE ----------
FROM node:20-alpine AS fe-builder
WORKDIR /app/frontend
COPY frontend/package*.json ./
RUN npm ci
COPY frontend ./
# חשוב: אם אתה משתמש ב-VITE_API_URL וכו', הוסף כאן:
# ARG VITE_API_URL
# ENV VITE_API_URL=$VITE_API_URL
RUN npm run build

# ---------- build BE (TypeScript) ----------
FROM node:20-alpine AS be-builder
WORKDIR /app/server
COPY server/package*.json ./
RUN npm ci
COPY server ./
# מניח שיש לך script "build": "tsc"
RUN npm run build

# ---------- runtime ----------
FROM node:20-alpine AS runner
WORKDIR /app/server
ENV NODE_ENV=production
ENV PORT=3000

# להתקין רק תלויות פרודקשן לשרת
COPY server/package*.json ./
RUN npm ci --omit=dev

# קבצי השרת (JS) שנבנו
COPY --from=be-builder /app/server/dist ./dist

# קבצי ה-FE שנבנו — נגיש כסטטי מהשרת
# נעתיק ל-dist/public כדי ש-Express יגיש אותם בקלות
COPY --from=fe-builder /app/frontend/dist ./dist/public

EXPOSE 3000
CMD ["node", "dist/index.js"]

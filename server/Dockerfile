# server/Dockerfile

# ---------- Build backend (TypeScript) ----------
FROM node:20-alpine AS be-builder
WORKDIR /app

# התקנת תלויות dev לשרת
COPY package*.json ./
RUN npm ci

# קוד השרת ובנייה
COPY tsconfig*.json ./
COPY src ./src
RUN npm run build  # מניח שיש "build": "tsc" שמוציא ל-dist

# ---------- Runtime ----------
FROM node:20-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production
ENV PORT=3000

# התקנת תלויות פרודקשן בלבד
COPY package*.json ./
RUN npm ci --omit=dev

# קבצי השרת שנבנו
COPY --from=be-builder /app/dist ./dist

# כאן הקסם: העתקת ה-build של ה-frontend מהאימג’ שנבנה ע״י compose
# compose יבנה אימג’ בשם saas-frontend:build (ראה למטה),
# ונעתיק ממנו את /app/dist לתוך dist/public כך שה-Express יגיש אותם.
COPY --from=saas-frontend:build /app/dist ./dist/public

EXPOSE 3000
CMD ["node", "dist/index.js"]

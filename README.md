# SaaS Project Management App

מערכת **SaaS לניהול פרויקטים** המבוססת על טכנולוגיות MERN + TypeScript.  
המערכת מאפשרת ניהול פרויקטים, יצירת משימות, הקצאת משתמשים, שיתופי פעולה והרשאות מתקדמות.

---

## 🚀 טכנולוגיות עיקריות
- **Frontend**
  - React + TypeScript
  - Redux Toolkit + RTK Query
  - React Hook Form + Zod
  - TailwindCSS + Heroicons

- **Backend**
  - Node.js + Express + TypeScript
  - MongoDB + Mongoose
  - JWT Authentication עם Cookies HttpOnly
  - Google OAuth2 Login
  - Jest לבדיקות

- **DevOps**
  - Docker + Docker Compose
  - GitHub Actions (CI/CD)

---

## 📂 מבנה פרויקט

│
├── client/ # צד לקוח (React + TS)
├── server/ # צד שרת (Express + TS)
├── docker-compose.yml
├── README.md



---

## ⚙️ התקנה והרצה

### דרישות מוקדמות
- Node.js v18+
- MongoDB (לוקאלי או בענן)
- Docker (אופציונלי)

### 1. Clone
```bash
git clone https://github.com/YOUR_USERNAME/YOUR_REPO.git
cd YOUR_REPO


cd client
npm install
npm run dev


cd server
npm install
npm run dev


docker-compose up --build

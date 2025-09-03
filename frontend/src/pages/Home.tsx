import {
  ClipboardDocumentListIcon,
  UserGroupIcon,
  SparklesIcon,
  BoltIcon,
  LockClosedIcon,
  BellIcon,
  ChartBarIcon,
  CloudIcon,
  PuzzlePieceIcon,
} from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";
import Button from "../components/button/Button";
import FeatureCard from "../components/home/FeatureCard";
import Step from "../components/home/Step";
import Footer from "../components/Footer";
import StaticDashboard from "../components/home/StaticDashboard";

const Home = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      <section className="px-6 pt-16 pb-12 md:pt-24 md:pb-20 max-w-6xl mx-auto">
        <div className="grid md:grid-cols-2 gap-10 items-center">
          <div>
            <span className="inline-block text-sm bg-blue-100 text-blue-700 rounded-full px-3 py-1 mb-4">
              ניהול פרויקטים חכם בענן
            </span>
            <h1 className="text-3xl md:text-5xl leading-tight text-gray-900">
              מנהלים פרויקטים בלי כאב ראש —
              <br className="hidden md:block" />
              משימות, צוות והרשאות במקום אחד.
            </h1>
            <p className="mt-4 text-gray-600 md:text-lg">
              מערכת  מודרנית לניהול פרויקטים: לוחות קנבן, עדכונים בזמן אמת,
              הרשאות מתקדמות, ודוחות התקדמות.
            </p>
            <div className="mt-8 flex gap-3">
              <Link to="register">
                <Button text="התחל עכשיו בחינם" type="button" className="p-2" />
              </Link>

              <Link to="about">
                <Button text="קרא עוד" type="button" className="px-3" />
              </Link>
            </div>
          </div>
          <StaticDashboard />
        </div>
      </section>

      <section className="px-6 py-12 md:py-16 max-w-6xl mx-auto">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
          למה לבחור בנו?
        </h2>
        <p className="mt-2 text-gray-600">
          כל מה שצריך כדי להוציא פרויקט לפועל — מהאיפיון ועד הגשת התוצר.
        </p>

        <div className="mt-8 grid md:grid-cols-3 gap-6">
          <FeatureCard
            emoji={<BoltIcon className="h-6 w-6 text-blue-600" />}
            title="מהיר ויעיל"
            text="מערכת מתקדמת לביצועים ונוחות עבודה."
          />
          <FeatureCard
            emoji={<LockClosedIcon className="h-6 w-6 text-blue-600" />}
            title="הרשאות מתקדמות"
            text="RBAC מלא — Admin, Project Manager, Member, Viewer."
          />
          <FeatureCard
            emoji={<BellIcon className="h-6 w-6 text-blue-600" />}
            title="עדכונים בזמן אמת"
            text="משימות מתעדכנות בזמן אמת ."
          />
          <FeatureCard
            emoji={<ChartBarIcon className="h-6 w-6 text-blue-600" />}
            title="דוחות ברורים"
            text="KPI, התקדמות ספרינטים, SLA — הכל בדשבורד אחד."
          />
          <FeatureCard
            emoji={<CloudIcon className="h-6 w-6 text-blue-600" />}
            title="SaaS בענן"
            text="עובד מכל מקום — גיבויים ואבטחה כלולים."
          />
          <FeatureCard
            emoji={<PuzzlePieceIcon className="h-6 w-6 text-blue-600" />}
            title="גמיש להתרחבות"
            text="מודולים נפרדים ו-API נקי לאינטגרציות."
          />
        </div>
      </section>

      <section className="px-6 py-12 md:py-16 max-w-6xl mx-auto">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
          איך זה עובד?
        </h2>
        <div className="mt-8 grid md:grid-cols-3 gap-6">
          <Step
            number="1"
            title="הירשם"
            text="פתח חשבון בקליק — אימייל/גוגל."
          />
          <Step
            number="2"
            title="צור פרויקט"
            text="הוסף חברי צוות, קבע סטטוסים ותגים."
          />
          <Step
            number="3"
            title="נהל משימות"
            text="גרור ושחרר בין To‑Do, בעבודה ובוצע."
          />
        </div>
        <div className="mt-8 w-40">
          <Link to="register">
            <Button text="בואו נתחיל" type="button" />
          </Link>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default Home;

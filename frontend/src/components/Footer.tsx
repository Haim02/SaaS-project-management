import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="px-6 py-10 border-t bg-white">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center md:items-start gap-6 md:gap-10">
        <div className="flex-1">
          <div className="text-lg font-bold text-blue-600">מנהל פרויקטים</div>
          <p className="mt-2 text-gray-600 text-sm">
            ניהול פרויקטים חכם, מהיר ובטוח — לצוותים קטנים ובינוניים.
          </p>
        </div>
        <div className="flex-1 grid grid-cols-2 gap-6 text-sm">
          <div>
            <div className="font-semibold mb-2">קישורים</div>
            <ul className="space-y-2">
              <li>
                <Link to="/about" className="hover:underline">
                  אודותינו
                </Link>
              </li>
              <li>
                <Link className="hover:underline" to="/login">
                  התחברות
                </Link>
              </li>
              <li>
                <Link className="hover:underline" to="/register">
                  הרשמה
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <div className="font-semibold mb-2">עזרה</div>
            <ul className="space-y-2">
              <li>
                <a href="#" className="hover:underline">
                  שאלות נפוצות
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  תמיכה
                </a>
              </li>
              <li>
                <Link to="/privacy">מדיניות פרטיות</Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <p className="mt-8 text-center text-xs text-gray-500">
        © {new Date().getFullYear()} מנהל פרויקטים — כל הזכויות שמורות.
      </p>
    </footer>
  );
}

export default Footer

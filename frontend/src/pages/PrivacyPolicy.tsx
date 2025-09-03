
const PrivacyPolicy = () => {
  return (
    <main className="mx-auto max-w-4xl p-6 space-y-8" dir="rtl">
      <header className="space-y-1">
        <h1 className="text-3xl font-bold">מדיניות פרטיות</h1>
        <p className="text-gray-600">עודכן לאחרונה: 01.09.2025</p>
      </header>

      <section className="bg-white border rounded-2xl shadow-sm p-6 space-y-4">
        <h2 className="text-xl font-semibold">מבוא</h2>
        <p className="text-gray-700 leading-7">
          הפרטיות שלך חשובה לנו. מסמך זה מסביר כיצד אנו אוספים, משתמשים ושומרים
          מידע אישי בעת השימוש במערכת.
        </p>
      </section>

      <section className="bg-white border rounded-2xl shadow-sm p-6 space-y-4">
        <h2 className="text-xl font-semibold">איסוף מידע</h2>
        <ul className="list-disc pr-6 space-y-2 text-gray-700">
          <li>פרטי הרשמה: שם מלא, כתובת אימייל, סיסמה (מוצפנת בלבד).</li>
          <li>
            מידע שימוש טכני: כתובת IP, דפדפן, מערכת הפעלה, זמני שימוש ושגיאות.
          </li>
          <li>תוכן שתעלה או תזין למערכת כחלק מניהול הפרויקטים.</li>
        </ul>
      </section>

      <section className="bg-white border rounded-2xl shadow-sm p-6 space-y-4">
        <h2 className="text-xl font-semibold">שימוש במידע</h2>
        <ul className="list-disc pr-6 space-y-2 text-gray-700">
          <li>אספקת השירות ושיפורו, תמיכה טכנית והתאמה אישית של חוויה.</li>
          <li>אבטחת המערכת, מניעת הונאה ואיתור בעיות.</li>
          <li>עמידה בדרישות חוקיות ורגולטוריות במידת הצורך.</li>
        </ul>
      </section>

      <section className="bg-white border rounded-2xl shadow-sm p-6 space-y-4">
        <h2 className="text-xl font-semibold">קובצי Cookie ואימות</h2>
        <p className="text-gray-700 leading-7">
          אנו משתמשים בקובצי Cookie לצורך אימות משתמשים (HttpOnly) ושיפור חוויית
          שימוש. ניתן לחסום Cookie בדפדפן, אך חלק מהפונקציות לא יעבדו ללא אימות.
        </p>
      </section>

      <section className="bg-white border rounded-2xl shadow-sm p-6 space-y-4">
        <h2 className="text-xl font-semibold">שיתוף מידע</h2>
        <p className="text-gray-700 leading-7">
          אנו לא מוכרים מידע אישי לצדדים שלישיים. ייתכן שיתוף עם נותני שירות
          עיבוד נתונים תחת הסכמי עיבוד ותנאי אבטחה מחמירים.
        </p>
      </section>

      <section className="bg-white border rounded-2xl shadow-sm p-6 space-y-4">
        <h2 className="text-xl font-semibold">אבטחת מידע</h2>
        <p className="text-gray-700 leading-7">
          נוקטים באמצעי אבטחה מקובלים, לרבות הצפנת תקשורת (TLS), בקרות גישה
          ולוגים. עם זאת, אין אבטחה מוחלטת ואנו ממליצים להשתמש בסיסמה חזקה
          ולעדכן אותה מעת לעת.
        </p>
      </section>

      <section className="bg-white border rounded-2xl shadow-sm p-6 space-y-4">
        <h2 className="text-xl font-semibold">זכויות משתמש</h2>
        <ul className="list-disc pr-6 space-y-2 text-gray-700">
          <li>בקשת גישה למידע, תיקון או מחיקה.</li>
          <li>משיכת הסכמה ככל שניתנה לעיבוד שאינו הכרחי לשירות.</li>
          <li>
            פנייה אלינו למימוש זכויותיך:{" "}
            <a
              href="mailto:privacy@example.com"
              className="text-blue-700 underline"
            >
              privacy@example.com
            </a>
            .
          </li>
        </ul>
      </section>

      <section className="bg-white border rounded-2xl shadow-sm p-6 space-y-4">
        <h2 className="text-xl font-semibold">שינויים במדיניות</h2>
        <p className="text-gray-700 leading-7">
          נעדכן מדיניות זו מעת לעת. המשך שימוש במערכת לאחר פרסום עדכונים מהווה
          הסכמה למדיניות המעודכנת.
        </p>
      </section>

      <footer className="text-sm text-gray-500">
        לפניות בנושא פרטיות:{" "}
        <a
          href="mailto:privacy@example.com"
          className="text-blue-700 underline"
        >
          privacy@example.com
        </a>
      </footer>
    </main>
  );
}

export default PrivacyPolicy

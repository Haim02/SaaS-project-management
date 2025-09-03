
const About = () => {
  return (
    <main className="mx-auto max-w-4xl p-6 space-y-8" dir="rtl">
      <header className="space-y-1">
        <h1 className="text-3xl font-bold">אודותינו</h1>
        <p className="text-gray-600">
          מערכת SaaS לניהול פרויקטים המיועדת לארגונים, צוותים ואנשים פרטיים.
        </p>
      </header>

      <section className="bg-white border rounded-2xl shadow-sm p-6 space-y-4">
        <h2 className="text-xl font-semibold">מי אנחנו</h2>
        <p className="text-gray-700 leading-7">
          אנחנו צוות פיתוח שמחוייב ליצירת חוויית ניהול פרויקטים יעילה, מודרנית
          ופשוטה. המערכת נבנתה בטכנולוגיות עדכניות כדי לספק ביצועים גבוהים,
          יציבות ואבטחה.
        </p>
      </section>

      <section className="bg-white border rounded-2xl shadow-sm p-6 space-y-4">
        <h2 className="text-xl font-semibold">מה מייחד אותנו</h2>
        <ul className="list-disc pr-6 space-y-2 text-gray-700">
          <li>ניהול משימות ופרויקטים עם הרשאות מתקדמות.</li>
          <li>שיתוף פעולה בזמן אמת ומעקב אחר התקדמות.</li>
          <li>תצוגות לוח, דוחות מסכמים ותובנות.</li>
          <li>אבטחה ברמת ארגון, כולל אימות מאובטח וקוקיות HttpOnly.</li>
        </ul>
      </section>

      <section className="bg-white border rounded-2xl shadow-sm p-6 space-y-4">
        <h2 className="text-xl font-semibold">החזון שלנו</h2>
        <p className="text-gray-700 leading-7">
          להפוך ניהול פרויקטים לחוויה נוחה, שקופה ומהירה—כך שכל צוות יוכל להתמקד
          בעשייה.
        </p>
      </section>
    </main>
  );
}

export default About

import { Link } from "react-router-dom";

type NoOrganizationProps = {
  creating?: boolean;
};

const NoOrganization = ({ creating }: NoOrganizationProps) => {
  return (
    <div dir="rtl" className="min-h-[40vh] grid place-items-center px-4">
      <div className="max-w-xl w-full text-center bg-white rounded-2xl p-8 shadow">
        <h2 className="text-2xl font-bold mb-2">אין ארגונים משויכים</h2>
        <p className="text-gray-600 mb-6">
          כרגע אינך משויך/ת לארגון. ניתן להצטרף לארגון קיים בעזרת קוד הזמנה, או
          ליצור ארגון חדש.
        </p>

        <div className="flex gap-3 justify-center">
          <Link to="/organization/join-organization">
            <button className="px-4 py-2 rounded-xl border hover:bg-gray-50">
              הצטרפות לארגון
            </button>
          </Link>

          <Link to="/organization/create-new-organization">
            <button
              disabled={!!creating}
              className="px-4 py-2 rounded-xl bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-60"
            >
              יצירת ארגון
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NoOrganization;

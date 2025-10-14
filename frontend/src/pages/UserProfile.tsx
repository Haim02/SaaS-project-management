import { useState } from "react";
import { useMeQuery } from "../services/authApi";
import Spinner from "../components/Spinner";
import Avatar from "../components/userForm/Avatar";
import DetailsForm from "../components/userForm/DetailsForm";
import SecurityForm from "../components/userForm/SecurityForm";

const UserProfile = () => {
  const { data: me, isLoading, isError } = useMeQuery();
  const [tab, setTab] = useState<"details" | "security">("details");

  if (isLoading) return <Spinner />;
  if (isError || !me) {
    return <div className="p-6 text-red-600">שגיאה בטעינת פרטי משתמש</div>;
  }

  return (
    <div className="p-6 max-w-3xl mx-auto space-y-6" dir="rtl">
      <header className="flex items-center gap-4">
        <Avatar name={me.name} />
        <div>
          <h1 className="text-2xl font-bold">הפרופיל שלי</h1>
          <p className="text-gray-600 text-sm">{me.email}</p>
        </div>
      </header>

      <div className="border-b flex gap-4">
        <button
          className={`pb-2 ${
            tab === "details"
              ? "border-b-2 border-blue-600 font-semibold"
              : "text-gray-600"
          }`}
          onClick={() => setTab("details")}
        >
          פרטים
        </button>
        <button
          className={`pb-2 ${
            tab === "security"
              ? "border-b-2 border-blue-600 font-semibold"
              : "text-gray-600"
          }`}
          onClick={() => setTab("security")}
        >
          אבטחה
        </button>
      </div>

      {tab === "details" ? (
        <DetailsForm initial={{ name: me.name, email: me.email }} />
      ) : (
        <SecurityForm />
      )}
    </div>
  );
};

export default UserProfile;

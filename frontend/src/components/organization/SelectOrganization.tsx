import { Link } from "react-router-dom";
import type { User } from "../../types/user";

type SelectOrganizationProps = {
  user: User;
  onChoose: React.FormEventHandler<HTMLFormElement>;
};

const SelectOrganization = ({ onChoose, user }: SelectOrganizationProps) => {
  const memberships = user.members ?? [];
  const hasOrgs = memberships.length > 0;

  return (
    <div
      dir="rtl"
      className="max-w-xl mx-auto bg-white rounded-2xl p-6 shadow space-y-4"
    >
      <h2 className="text-xl font-semibold">בחר/י ארגון לעבודה</h2>

      {hasOrgs ? (
        <form onSubmit={onChoose} className="space-y-3">
          <select name="orgId" className="w-full border rounded-lg px-3 py-2">
            {memberships.map((org) => (
              <option key={org._id} value={org._id}>
                {org.name ?? org._id} — {org.role}
              </option>
            ))}
          </select>

          <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl">
            המשך
          </button>
        </form>
      ) : (
        <p className="text-gray-600">כרגע אינך משויך/ת לארגון.</p>
      )}

      <div className="border-t pt-4 mt-2 flex items-center justify-between gap-3">
        <Link
          to="/organization/join-organization"
          className="flex-1 px-4 py-2 rounded-xl border text-center hover:bg-gray-50"
        >
          הצטרפות לארגון
        </Link>
        <Link
          to="/organization/create-new-organization"
          className="flex-1 px-4 py-2 rounded-xl bg-blue-600 text-white text-center hover:bg-blue-700"
        >
          יצירת ארגון חדש
        </Link>
      </div>
    </div>
  );
};

export default SelectOrganization;

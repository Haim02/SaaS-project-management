import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { api } from "../services/api";
import { useMeQuery } from "../services/authApi";
import useActiveOrg from "../hooks/useActiveOrg";

const JOIN_VALUE = "__join__";
const CREATE_VALUE = "__create__";

type Props = {
  goAfterChange?: string;
};

const OrgSelector = ({ goAfterChange }: Props) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { data: me } = useMeQuery();
  const { activeOrgId, setActiveOrgId } = useActiveOrg(me || null);

  const memberships = me?.members ?? [];

  if (!memberships.length) {
    return (
      <div className="inline-flex gap-2" dir="rtl">
        <button
          onClick={() => navigate("/organization/join-organization")}
          className="px-3 py-2 rounded-lg border hover:bg-gray-50"
        >
          הצטרפות לארגון
        </button>
        <button
          onClick={() => navigate("/organization/create-new-organization")}
          className="px-3 py-2 rounded-lg border bg-blue-600 text-white hover:bg-blue-700"
        >
          יצירת ארגון
        </button>
      </div>
    );
  }

  const onChange: React.ChangeEventHandler<HTMLSelectElement> = async (e) => {
    const value = e.target.value;

    if (value === JOIN_VALUE) {
      navigate("/organization/join-organization");
      return;
    }
    if (value === CREATE_VALUE) {
      navigate("/organization/create-new-organization");
      return;
    }

    setActiveOrgId(value);

    dispatch(api.util.invalidateTags(["Projects", "Tasks", "Organizations"]));
    dispatch(api.util.invalidateTags(["Me"]));

    if (goAfterChange) {
      navigate(goAfterChange);
    }
  };

  return (
    <select
      dir="rtl"
      className="border rounded-lg px-3 py-2 text-sm bg-white"
      value={activeOrgId ?? ""}
      onChange={onChange}
      title="בחר ארגון פעיל"
    >
      {memberships.map((org) => (
        <option key={org._id} value={org._id}>
          {org.name ?? org._id} {org.role ? `– ${org.role}` : ""}
        </option>
      ))}

      <option disabled>──────────</option>

      <option value={JOIN_VALUE}>הצטרפות עם קוד…</option>
      <option value={CREATE_VALUE}>יצירת ארגון חדש…</option>
    </select>
  );
};

export default OrgSelector;

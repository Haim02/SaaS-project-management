import React, { useMemo, useState } from "react";
import { useHasOrg } from "../../hooks/useHasOrg";
import Spinner from "../Spinner";
import NoOrganization from "./NoOrganization";
import { useMeQuery } from "../../services/authApi";

const ORG_KEY = "active_org_id";
const getActiveOrg = () => localStorage.getItem(ORG_KEY) ?? "";
const setActiveOrg = (id: string) => localStorage.setItem(ORG_KEY, id);

type Props = {
  children: React.ReactNode;
  requireOrgId?: boolean;
};

const OrganizationGate = ({ children, requireOrgId = true }: Props) => {
  const { me, hasOrg, isLoading } = useHasOrg();
  const [_joinOpen, setJoinOpen] = useState(false);

  const [creating, _setCreating] = useState(false);
  const { refetch: refetchMe } = useMeQuery(undefined, { skip: true });

  const activeOrgId = getActiveOrg();
  const needSelectOrg = useMemo(
    () => !!me && hasOrg && !activeOrgId,
    [me, hasOrg, activeOrgId]
  );

  if (isLoading) {
    return (
      <div className="min-h-[50vh] grid place-items-center">
        <Spinner />
      </div>
    );
  }

  if (!me) return <>{children}</>;

  if (!hasOrg) {
    return (
      <>
        <div dir="rtl" className="max-w-xl mx-auto">
          <NoOrganization creating={creating} />
        </div>

        <h1>הצטרף לארגון</h1>

        {creating ? (
          <div className="fixed inset-0 grid place-items-center bg-black/20">
            <Spinner />
          </div>
        ) : null}
      </>
    );
  }

  if (needSelectOrg) {
    const onChoose: React.FormEventHandler<HTMLFormElement> = async (e) => {
      e.preventDefault();
      const fd = new FormData(e.currentTarget);
      const chosen = String(fd.get("orgId") || "");
      if (chosen) {
        setActiveOrg(chosen);
        await refetchMe();
      }
    };

    if (!requireOrgId) {
      return (
        <>
          <div
            dir="rtl"
            className="max-w-xl mx-auto bg-white rounded-2xl p-6 shadow space-y-4 mb-6"
          >
            <h2 className="text-xl font-semibold">בחר/י ארגון לעבודה</h2>
            <form onSubmit={onChoose} className="space-y-3">
              <select
                name="orgId"
                className="w-full border rounded-lg px-3 py-2"
              >
                {me.members!.map((member) => (
                  <option key={member._id} value={member._id}>
                    {member.name ?? member._id} — {member.role}
                  </option>
                ))}
              </select>
              <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl">
                המשך
              </button>
            </form>
          </div>
          {children}
        </>
      );
    }

    // ברירת מחדל (העמוד *חייב* orgId): חוסמים עד לבחירה
    return (
      <div dir="rtl" className="min-h-[60vh] grid place-items-center px-4">
        <div className="w-full max-w-md bg-white rounded-2xl p-6 shadow">
          <h1 className="text-xl font-bold mb-4">בחר/י ארגון לעבודה</h1>
          <form onSubmit={onChoose} className="space-y-4">
            <div>
              <label className="block mb-1 font-medium">ארגון</label>
              <select
                name="orgId"
                className="w-full border rounded-lg px-3 py-2"
              >
                {me.members!.map((member) => (
                  <option key={member._id} value={member._id}>
                    {member.name ?? member._id} — {member.role}
                  </option>
                ))}
              </select>
            </div>
            <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl">
              המשך
            </button>
            <div className="text-sm text-gray-500 text-center">
              אין ארגון מתאים?{" "}
              <button
                type="button"
                onClick={() => setJoinOpen(true)}
                className="underline"
              >
                הצטרפות/יצירה
              </button>
            </div>
          </form>

          {/* מודל הצטרפות (לא חובה – לפי המימוש שלך) */}
          {/* <JoinOrganization
            open={joinOpen}
            onClose={() => setJoinOpen(false)}
          /> */}
        </div>
      </div>
    );
  }

  // יש orgId פעיל – משחררים את הילדים
  return <>{children}</>;
};

export default OrganizationGate;

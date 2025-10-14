import { useMemo } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useMeQuery } from "../services/authApi";
import {
  useGetInviteQuery,
  useRenewInviteMutation,
  useDeleteOrganizationMutation,
} from "../services/organizationApi";
import Button from "../components/button/Button";

export const ORG_KEY = "active_org_id";
export const getActiveOrg = () => localStorage.getItem(ORG_KEY) ?? "";
export const setActiveOrg = (id: string) => localStorage.setItem(ORG_KEY, id);
export const clearActiveOrg = () => localStorage.removeItem(ORG_KEY);

export default function OrgSettings() {
  const orgId = getActiveOrg();
  const nav = useNavigate();
  const { data: me } = useMeQuery();
  const membership = useMemo(
    () => me?.members?.find((org) => org._id === orgId),
    [me, orgId]
  );
  const { data: invite, isLoading } = useGetInviteQuery(
    { orgId },
    { skip: !orgId }
  );
  const [renewInvite, { isLoading: renewing }] = useRenewInviteMutation();
  const [deleteOrg, { isLoading: deleting }] = useDeleteOrganizationMutation();
  console.log("membership OrgSettings", membership);
  const isOwner = membership && membership.role === "owner";

  const inviteLink = invite?.inviteCode
    ? `${window.location.origin}/orgs/join?invite=${invite.inviteCode}`
    : "";

  const copy = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      alert("הועתק");
    } catch {
      alert("לא הצלחנו להעתיק");
    }
  };

  const onDelete = async () => {
    if (!isOwner) return;
    if (!confirm("למחוק את הארגון לצמיתות? פעולה זו אינה הפיכה.")) return;
    await deleteOrg({ orgId }).unwrap();
    clearActiveOrg();
    nav("/projects", { replace: true });
  };

  if (!orgId) {
    return (
      <div className="p-6" dir="rtl">
        אין ארגון פעיל.
      </div>
    );
  }

  if (!isOwner) {
    return (
      <div className="p-6 text-red-600" dir="rtl">
        אין לך הרשאה לצפות בהגדרות הארגון.
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto p-6 space-y-6" dir="rtl">
      <h1 className="text-2xl font-bold">הגדרות ארגון</h1>

      <section className="bg-white rounded-2xl border p-4 space-y-3">
        <h2 className="font-semibold">הזמנת משתמשים</h2>

        <div className="text-xl">
          קוד הזמנה:{" "}
          <span className="font-mono text-xl font-bold">
            {invite?.inviteCode}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <Button
            text="העתק קישור הזמנה"
            type="button"
            className="w-2xs"
            onClick={() => copy(inviteLink)}
          />
        </div>
        <p className="text-xs text-gray-500">
          שלחו למוזמן/ת את הקישור: {inviteLink}
        </p>
      </section>

      {isOwner && (
        <section className="bg-white rounded-2xl border p-4 space-y-3">
          <h2 className="font-semibold text-red-700">מחיקת ארגון</h2>
          <p className="text-sm text-gray-600">
            מחיקה תסיר את הארגון לצמיתות. ודא/י שגיבית נתונים חשובים. פעולה זו
            זמינה ל-Owner בלבד.
          </p>
          <Button
            text="מחק ארגון"
            type="button"
            onClick={onDelete}
            isLoading={deleting}
            className="px-4 py-2 rounded-xl bg-red-600 text-white hover:bg-red-700 disabled:opacity-60"
          />
        </section>
      )}
    </div>
  );
}

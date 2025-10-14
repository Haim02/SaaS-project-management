import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useMeQuery } from "../../services/authApi";
import { useJoinOrganizationMutation } from "../../services/organizationApi";
import Button from "../button/Button";

const ORG_KEY = "active_org_id";
const setActiveOrg = (id: string) => localStorage.setItem(ORG_KEY, id);

export default function JoinOrganization() {
  const location = useLocation();
  const navigate = useNavigate();
  const [code, setCode] = useState("");
  const [join, { isLoading, error }] = useJoinOrganizationMutation();
  const { refetch: refetchMe, data: me } = useMeQuery();

  useEffect(() => {
    const p = new URLSearchParams(location.search);
    const invite = p.get("invite");
    if (invite) setCode(invite);
  }, [location.search]);


  const submit: React.FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    try {
      const res = await join({code: code,userId: me?._id as string}).unwrap();
      if ((res as any)?.orgId) {
        setActiveOrg((res as any).orgId);
        await refetchMe();
        navigate("/projects", { replace: true });
      }
    } catch (err){
      console.log("שגיאה נסה שוב מאוחר יותר")
    }
  };

  return (
    <div
      dir="rtl"
      className="max-w-md mx-auto bg-white rounded-2xl p-6 mt-8 shadow space-y-4"
    >
      <h1 className="text-2xl font-bold">הצטרפות לארגון</h1>
      <form onSubmit={submit} className="space-y-3">
        <div>
          <label className="block mb-1 font-medium">קוד הזמנה</label>
          <input
            className="w-full border rounded-lg px-3 py-2"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            placeholder="לדוגמה: AB12-CD34"
          />
          {error ? (
            <p className="text-sm text-red-600 mt-2">קוד שגוי או שפג תוקפו</p>
          ) : null}
        </div>

        <Button text="הצטרפות" type="submit" isLoading={isLoading} />
      </form>
    </div>
  );
}

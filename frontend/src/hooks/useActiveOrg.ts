import { useEffect, useMemo, useState } from "react";
import type { User } from "../types/user";

const KEY = "active_org_id";

const useActiveOrg = (me?: User | null)  =>{
    const [activeOrgId, _set] = useState<string | null>(() => localStorage.getItem(KEY));
    useEffect(() => {
        if (!me){
             return;
        }
        if (!activeOrgId && me.members?.length) {
            const first = me.members[0]._id;
            localStorage.setItem(KEY, first);
            _set(first);
        }
        if (activeOrgId && !me.members?.some(member => member._id === activeOrgId)) {
            localStorage.removeItem(KEY);
            _set(null);
        }
    }, [me]);

    const setActiveOrgId = (id: string) => { localStorage.setItem(KEY, id); _set(id); };
    const myRole: ("owner" | "member") | null = useMemo(() => {
        if (!me || !activeOrgId) {
            return null;
        }
        return me.members?.find(member => member._id === activeOrgId)?.role ?? null;
    }, [me, activeOrgId]);

    return { activeOrgId, setActiveOrgId, myRole };
}

export default useActiveOrg;
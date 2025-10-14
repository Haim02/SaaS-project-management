
import { useMemo } from "react";
import type { User } from "../types/user";
import { RolePermissions, type Permission } from "../types/policy";
import  useActiveOrg  from "./useActiveOrg";

export function useAuthz(me?: User | null) {
    const { activeOrgId } = useActiveOrg(me);
    const role = useMemo(() => {
        if (!me || !activeOrgId) return null;
        return me.members?.find(member => member._id === activeOrgId)?.role ?? null;
    }, [me, activeOrgId]);

    const permissions = useMemo(() => new Set(role ? RolePermissions[role] : []), [role]);
    const can = (p: Permission) => permissions.has(p);

    return { activeOrgId, role, can };
}

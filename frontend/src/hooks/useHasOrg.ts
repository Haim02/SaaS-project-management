import { useMeQuery } from "../services/authApi";

export function useHasOrg() {
    const { data: me, isLoading } = useMeQuery();
    const hasOrg = !!me && (me.members?.length ?? 0) > 0;
    return { me, hasOrg, isLoading };
}

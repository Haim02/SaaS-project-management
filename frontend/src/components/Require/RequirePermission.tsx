import type { Permission } from "../../types/policy";
import Spinner from "./../Spinner";
import { useAuthz } from "./../../hooks/useAuthz";

type RequirePermissionProps = {
  perm: Permission;
  children: React.ReactNode;
};

const RequirePermission = ({ perm, children }: RequirePermissionProps) => {
  let me = null;
  let isLoading = false;
  const { can } = useAuthz(me);

  if (isLoading) return <Spinner />;
  if (!me) return null;
  if (!can(perm)) return null;

  return <>{children}</>;
};

export default RequirePermission;

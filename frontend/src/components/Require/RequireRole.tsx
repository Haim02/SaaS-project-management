import { useMeQuery } from "../../services/authApi";
import Spinner from "./../Spinner";

type RequireRoleProps = {
  roles: Array<"owner" | "admin" | "member" | "guest">;
  children: React.ReactNode;
};

const RequireRole = ({ children }: RequireRoleProps) => {
  const { data: me, isLoading } = useMeQuery();
  if (isLoading) return <Spinner />;
  if (!me) return null;

  return <>{children}</>;
};

export default RequireRole;

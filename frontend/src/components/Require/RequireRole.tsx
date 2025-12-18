import { useLocation, Navigate } from "react-router-dom";
import { useMeQuery } from "../../services/authApi";
import Spinner from "./../Spinner";

type RequireRoleProps = {
  roles: Array<"owner" | "admin" | "member" | "guest">;
  children: React.ReactNode;
};

const RequireRole = ({ children, roles }: RequireRoleProps) => {
  const location = useLocation();
  const { data: me, isLoading } = useMeQuery();

  if (isLoading) return <Spinner />;

  if (!me) {
    return <Navigate to="/" replace state={{ from: location.pathname }} />;
  }

  const hasRole = me.members?.some((member) => roles.includes(member.role))

  if (!hasRole) {
    return <Navigate to="/unauthorized" replace />;
  }
  // if (!roles.includes(me.members[0].role)) {
  //   return <Navigate to="/unauthorized" replace />;
  // }

  return <>{children}</>;
};

export default RequireRole;

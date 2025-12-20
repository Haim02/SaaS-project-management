// import { useLocation, Navigate } from "react-router-dom";
// import { useMeQuery } from "../../services/authApi";
// import Spinner from "./../Spinner";

// type RequireRoleProps = {
//   roles: Array<"owner" | "admin" | "member" | "guest">;
//   children: React.ReactNode;
// };

// const RequireRole = ({ children, roles }: RequireRoleProps) => {
//   const location = useLocation();
//   const { data: me, isLoading } = useMeQuery();

//   if (isLoading) return <Spinner />;

//   if (!me) {
//     return <Navigate to="/" replace state={{ from: location.pathname }} />;
//   }

//   const hasRole = me.members?.some((member) => roles.includes(member.role))

//   if (!hasRole) {
//     return <Navigate to="/unauthorized" replace />;
//   }
//   // if (!roles.includes(me.members[0].role)) {
//   //   return <Navigate to="/unauthorized" replace />;
//   // }

//   return <>{children}</>;
// };

// export default RequireRole;


import { Navigate, useLocation } from "react-router-dom";
import { useMeQuery } from "../../services/authApi";
import Spinner from "./../Spinner";

type Role = "owner" | "admin" | "member" | "guest";

type Props = {
  roles: Role[];
  children: React.ReactNode;
};

export default function RequireRole({ roles, children }: Props) {
  const location = useLocation();
  const { data: me, isLoading, isError } = useMeQuery();

  if (isLoading) {
    return <Spinner />;
  }

  if (isError || !me) {
    return <Navigate to="/login" replace state={{ from: location.pathname }} />;
  }

  const hasRole = me.members?.some((member) => roles.includes(member.role));

  if (!hasRole) {
    return <Navigate to="/no-organization" replace />;
  }

  return <>{children}</>;
}

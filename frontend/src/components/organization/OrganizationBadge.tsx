import type { User } from "../../types/user";

type OrganizationBadgeProps = {
  orgId: string;
  user: User;
};
const OrganizationBadge = ({user, orgId}: OrganizationBadgeProps) => {
   const organization = user?.members?.find((membership: any) => membership.orgId === orgId);

   if (!organization) return null;

   return (
     <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gray-100 border text-sm">
       <span className="font-medium">{organization.name ?? orgId}</span>
       <span className="text-gray-500">({organization.role})</span>
     </span>
   );
}

export default OrganizationBadge

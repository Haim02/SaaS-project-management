
export type User = {
    _id: string;
    name: string;
    email: string;
    members: Members[]
};

export type Members = {
    _id: string;
    name?: string;
    description?: string;
    role: "owner" | "member" };

export type Membership = {
    orgId: string;
    orgName?: string;
    role: "owner" | "admin" | "member" | "guest" };

export type PassProps = {
    user: User | null;
    isLoading?: boolean;
    isAuthenticated?: boolean;
    isError?: boolean
}
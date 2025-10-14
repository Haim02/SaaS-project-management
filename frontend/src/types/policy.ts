export type Role = "owner" | "admin" | "member" | "guest";

export type Permission =
    | "org.manage"
    | "project.create"
    | "project.delete"
    | "task.create"
    | "task.update"
    | "task.delete"
    | "report.view";

export const RolePermissions: Record<Role, Permission[]> = {
    owner: [
        "org.manage",
        "project.create", "project.delete",
        "task.create", "task.update", "task.delete",
        "report.view",
    ],
    admin: [
        "project.create", "project.delete",
        "task.create", "task.update", "task.delete",
        "report.view",
    ],
    member: ["task.create", "task.update", "report.view"],
    guest: ["report.view"],
};

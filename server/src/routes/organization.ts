import { Router } from "express";
import { auth } from "../middleware/auth";
import { createOrganization, getMyOrganizations, addMember, joinOrganization, renewInvite, getInvite, deleteOrganization } from "../controllers/organization";
import { requireOrgRole } from "../middleware/orgRole";

export const organizationRouter = Router();

organizationRouter.post("/", auth, createOrganization);
organizationRouter.get("/myOrganizations", auth, getMyOrganizations);
organizationRouter.post("/join-organization", joinOrganization);
organizationRouter.post("/:orgId/members", auth, addMember);
organizationRouter.get("/:orgId/invite", auth, requireOrgRole(["owner", "admin"]), getInvite);
organizationRouter.post("/:orgId/invite/renew", auth, requireOrgRole(["owner", "admin"]), renewInvite);
organizationRouter.delete("/:orgId", auth, requireOrgRole(["owner"]), deleteOrganization);

export default organizationRouter;
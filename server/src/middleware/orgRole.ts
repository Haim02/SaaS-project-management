// server/src/middleware/orgRole.ts
import { Request, Response, NextFunction } from "express";
import { StatusCodes as S } from "http-status-codes";
import { Organization } from "../models/Organization";
import mongoose from "mongoose";

export function requireOrgRole(roles: Array<"owner" | "admin" | "member" | "guest">) {
    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            const userId = req.userId;
            const { orgId } = req.params;

            if (!userId) return res.status(S.UNAUTHORIZED).json({ error: "Unauthorized" });
            if (!orgId || !mongoose.isValidObjectId(orgId)) {
                return res.status(S.BAD_REQUEST).json({ error: "Invalid orgId" });
            }

            const org = await Organization.findById(orgId).lean();
            if (!org) return res.status(S.NOT_FOUND).json({ error: "Organization not found" });

            const me = org.members.find(m => String(m.userId) === String(userId));
            if (!me) return res.status(S.FORBIDDEN).json({ error: "Not a member" });

            if (!roles.includes(me.role as any)) {
                return res.status(S.FORBIDDEN).json({ error: "Insufficient role" });
            }

            (req as any).org = org;
            next();
        } catch (e) {
            console.error("requireOrgRole error", e);
            res.status(S.INTERNAL_SERVER_ERROR).json({ error: "Server error" });
        }
    };
}

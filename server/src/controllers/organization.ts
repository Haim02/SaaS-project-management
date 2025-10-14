import { Request, Response } from "express";
import { StatusCodes as S } from "http-status-codes";
import { Organization } from "../models/Organization";
import { generateUniqueInviteCode, normalizeCode } from "../utils/invite";
import mongoose from "mongoose";
import { User } from "../models/User";


export async function createOrganization(req: Request, res: Response) {
    try {
        const userId = req.userId;
        if (!userId) return res.status(S.UNAUTHORIZED).json({ error: "Unauthorized" });

        const { name, description } = req.body as { name: string; description?: string };

        if (!name || name.trim().length < 2) {
            return res.status(S.BAD_REQUEST).json({ error: "שם ארגון קצר מדי" });
        }

        const org = await Organization.create({
            name,
            description,
            members: [{ userId: new mongoose.Types.ObjectId(userId), role: "owner" }]
        });

        await User.updateOne({ _id: userId }, { $push: { members: org._id } })

        return res.status(S.CREATED).json({
            _id: String(org._id),
            name: org.name,
            description: org.description,
            members: org.members.map((member) => ({ userId: String(member.userId), role: member.role })),
            createdAt: org.createdAt,
            updatedAt: org.updatedAt,
        });
    } catch (error) {
        return res.status(S.INTERNAL_SERVER_ERROR).json({ error: "Failed to create organization" });
    }
}

export async function joinOrganization(req: Request, res: Response) {
    const { code, userId } = req.body;

    try {
        if (!userId) return res.status(S.UNAUTHORIZED).json({ error: "Unauthorized" });


        const org = await Organization.findById(code);
        if (!org) {
            return res.status(S.NOT_FOUND).json({ error: "Organization not found" });
        }

        await Organization.updateOne({ _id: org._id }, { $push: { members: { userId } } })
        await User.updateOne({ _id: userId }, { $push: { members: org._id } })

        return res.json({ ok: true, orgId: String(org._id) });
    } catch (error) {
        return res.status(S.INTERNAL_SERVER_ERROR).json({ error: "Failed to join organization" });
    }
}

export async function getMyOrganizations(req: Request, res: Response) {
    try {
        const userId = req.userId;
        if (!userId) return res.status(S.UNAUTHORIZED).json({ error: "Unauthorized" });

        const orgs = await Organization.find({ "members.userId": userId })
            .select("_id name description members createdAt updatedAt")
            .sort({ updatedAt: -1 })
            .lean();

        const data = orgs.map((o: any) => ({
            _id: String(o._id),
            name: o.name,
            description: o.description,
            role: (o.members.find((m: any) => String(m.userId) === String(userId))?.role) as "owner" | "member",
            membersCount: o.members.length,
            createdAt: o.createdAt,
            updatedAt: o.updatedAt,
        }));

        return res.json(data);
    } catch (e) {
        return res.status(S.INTERNAL_SERVER_ERROR).json({ error: "Failed to fetch organizations" });
    }
}

export async function addMember(req: Request, res: Response) {
    try {
        const userId = req.userId;
        if (!userId) return res.status(S.UNAUTHORIZED).json({ error: "Unauthorized" });

        const { orgId } = req.params;
        const { userId: newUserId, role } = req.body as { userId: string; role: "member" };

        const org = await Organization.findById(orgId);
        if (!org) return res.status(S.NOT_FOUND).json({ error: "Organization not found" });

        const me = org.members.find((m) => String(m.userId) === String(userId));
        if (!me || !["owner", "admin"].includes(me.role)) {
            return res.status(S.FORBIDDEN).json({ error: "Forbidden" });
        }

        if (org.members.some((m) => String(m.userId) === String(newUserId))) {
            return res.status(S.CONFLICT).json({ error: "User already a member" });
        }

        org.members.push({ userId: new mongoose.Types.ObjectId(newUserId), role: "member" });
        await org.save();

        return res.json({ ok: true });
    } catch (e) {
        return res.status(S.INTERNAL_SERVER_ERROR).json({ error: "Failed to add member" });
    }
}

export async function getInvite(req: Request, res: Response) {
    const { orgId } = req.params;
    const org = await Organization.findById(orgId).lean();
    if (!org) return res.status(S.NOT_FOUND).json({ error: "Organization not found" });

    return res.json({
        inviteCode: org._id ?? null,
        inviteExpiresAt: org.inviteExpiresAt ?? null,
    });
}


export async function renewInvite(req: Request, res: Response) {
    const { orgId } = req.params;
    const org = await Organization.findById(orgId);
    if (!org) return res.status(S.NOT_FOUND).json({ error: "Organization not found" });

    org.inviteCode = await generateUniqueInviteCode();
    org.inviteExpiresAt = new Date(Date.now() + 1000 * 60 * 60 * 24 * 30); // 30 יום
    await org.save();

    return res.json({ inviteCode: org.inviteCode, inviteExpiresAt: org.inviteExpiresAt });
}


export async function deleteOrganization(req: Request, res: Response) {
    const { orgId } = req.params;
    if (!mongoose.isValidObjectId(orgId)) {
        return res.status(S.BAD_REQUEST).json({ error: "Invalid orgId" });
    }

    const org = await Organization.findByIdAndDelete(orgId);
    if (!org) return res.status(S.NOT_FOUND).json({ error: "Organization not found" });

    return res.json({ ok: true });
}
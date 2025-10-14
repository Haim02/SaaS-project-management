import crypto from "crypto";
import { Organization } from "../models/Organization";

export async function generateUniqueInviteCode(): Promise<string> {
    while (true) {
        const partA = crypto.randomBytes(3).toString("hex").slice(0, 4).toUpperCase();
        const partB = crypto.randomBytes(3).toString("hex").slice(0, 4).toUpperCase();
        const code = `${partA}-${partB}`;
        const exists = await Organization.findOne({ inviteCode: code }).lean();
        if (!exists) return code;
    }
}

export function normalizeCode(input: string) {
    return input.trim().toUpperCase();
}

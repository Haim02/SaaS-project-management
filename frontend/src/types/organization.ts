export type JoinOrgResponse = {
    ok: boolean;
    orgId: string
};

export type CreateOrgBody = {
    name: string;
    description?: string
};

export type CreateOrgResponse = {
    _id: string;
    name: string;
    description?: string
};

export type InviteResp = { inviteCode: string | null; inviteExpiresAt: string | null };
export type RenewResp = { inviteCode: string; inviteExpiresAt: string };
export type DeleteResp = { ok: boolean };
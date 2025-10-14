// server/src/models/Organization.ts
import mongoose, { Schema, Document } from "mongoose";


export interface OrganizationDocument extends Document {
    name: string;
    description?: string;
    members: Member[];
    inviteCode?: string;     // קוד הזמנה (לא חייב להיות ייחודי גלובלית, אבל נייצר כייחודי)
    inviteExpiresAt?: Date;
    createdAt: Date;
    updatedAt: Date;
}

export type Role = "owner" | "member";

export interface Member {
    userId: mongoose.Types.ObjectId;
    role: Role;
}


const organizationSchema = new Schema<OrganizationDocument>(
    {
        name: { type: String, required: true },
        description: { type: String },
         members: [{
            userId: {
                type: Schema.Types.ObjectId,
                ref: 'User',
                 },
             role: {
                type: String,
                 default: 'member',
                 enum: ["owner", "member"]
             }
             }],
    },
    { timestamps: true }
);

organizationSchema.index({ "members.userId": 1 });

export const Organization = mongoose.model<OrganizationDocument>(
    "Organization",
    organizationSchema
);

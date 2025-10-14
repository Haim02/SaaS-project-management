import { Schema, model, Types } from "mongoose";

const projectSchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String
    },
    ownerId: {
        type: Types.ObjectId,
        ref: "User",
        required: true
    },
    orgId: {
         type: Types.ObjectId,
         ref: "Organization",
         required: true,
         index: true },

}, { timestamps: true });

projectSchema.index({ orgId: 1, name: 1 }, { unique: true });

export const Project = model("Project", projectSchema);

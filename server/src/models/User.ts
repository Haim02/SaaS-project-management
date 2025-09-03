import { model, Schema } from "mongoose";

const userSchema = new Schema({
    name: {
        type: String,
        require: true,
        trim: true
    },
    email: {
        type: String,
        unique: true,
        require: true,
        trim: true
    },
    password: {
        type: String,
        require: true
    },
    googleId: {
        type: String,
        index: true
    },
    provider: {
        type: String,
        enum: ["local", "google"],
        default: "local" },

}, { timestamps: true })

export const User = model('User', userSchema)
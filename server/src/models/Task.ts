import { Schema, model, Types } from "mongoose";

const taskSchema = new Schema({
    projectId: {
        type:
        Types.ObjectId,
        ref: "Project",
        required: true
    },
    title: {
        type: String,
        required: true,
        trim: true
    },
    description: String,
    status: {
        type: String,
        enum: ["todo", "inprogress", "done"],
        default: "todo"
    },
    priority: {
        type: String,
         enum: ["low", "medium", "high"],
         default: "medium"
        },
    assigneeName: String,
    order: {
        type: Number,
        default: 1000
    },
    labels: {
        type: [String],
        default: []
     }
}, { timestamps: true });

export const Task = model("Task", taskSchema);

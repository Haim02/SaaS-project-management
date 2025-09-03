const mongoose = require("mongoose");
import { env } from "../config/env";

const MONGODB_URL = env.MONGO_URI.replace(
    "<password>",
    env.MONGO_PASSWORD
);

mongoose.connection.once("open", () => {
    console.log("MongoDB connection reday!");
});

mongoose.connection.on("error", (err: Error) => {
    console.error(err);
});

export const connectDB = async() => {
    mongoose.set("strictQuery", true);
    await mongoose.connect(MONGODB_URL);
    console.log("MongoDB connected");
}

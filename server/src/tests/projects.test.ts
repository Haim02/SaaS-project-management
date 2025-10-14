import request from "supertest";
import app from '../app';
import { connectDB } from "../db/mongoose";
import mongoose from "mongoose";

let token = "";
let projectId = "";


beforeAll(async () => {
    await connectDB();
    const res = await request(app)
        .post("/api/auth/register")
        .send({
            name: "yosi",
            email: "yosi@example.com",
            password: "yosi12345678"
        });

    const loginUser = await request(app)
        .post("/api/auth/login")
        .send({
            email: "yosi@example.com",
            password: "yosi12345678"
        })
    token = loginUser.headers['set-cookie'][0]
});

afterAll(async () => {
    await mongoose.connection.dropDatabase();
    await mongoose.connection.close();
});

describe("Test POST + GET + DELETE", () => {
    it("It should respond with 201 created", async () => {
        const res = await request(app)
            .post("/api/projects/projects")
            .set("Cookie", token)
            .send({
                name: "new project",
                description: "test project"
            })
            projectId = res.body._id
            expect(res.statusCode).toBe(201)
    })

    it("It should respond with 200 ok", async () => {
        const res = await request(app)
            .get("/api/projects")
            .set("Cookie", token)
            expect(res.statusCode).toBe(200)
    })

    it("It should respond with 200 deleted", async () => {
        const res = await request(app)
            .delete(`/api/projects/projects/${projectId}`)
            .set("Cookie", token)
            expect(res.statusCode).toBe(200)
    })
})


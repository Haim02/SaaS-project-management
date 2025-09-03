import request from "supertest";
import app from '../app';
import { connectDB } from "../db/mongoose";
import mongoose from "mongoose";

let token = ""

beforeAll (async () => {
    await connectDB()
})

beforeAll(async () => {
    await connectDB();
    const res = await request(app)
        .post("/api/auth/register")
        .send({
            name: "haim",
            email: "haim@gmail.com",
            password: "Haim12345678"
        });

    const loginUser = await request(app)
        .post("/api/auth/login")
        .send({
            email: "haim@gmail.com",
            password: "Haim12345678"
        })
    token = loginUser.headers['set-cookie'][0]
});

afterAll (async () => {
    await mongoose.connection.dropDatabase();
    await mongoose.connection.close()
})

describe("Test POST /auth/register", () => {
    it("It should respond with 201 success", async () => {
        const res = await request(app)
        .post("/api/auth/register")
        .send({
            name: "test",
            email: "test@gmail.com",
            password: "Haim12345678"
        })
        expect(res.statusCode).toBe(201)
    })

    it("It should respond with 409 error", async () => {
        const res = await request(app)
        .post("/api/auth/register")
        .send({
            email: "haim@gmail.com",
            password: "Haim12345678"
        })
        expect(res.statusCode).toBe(409)
      })
})

describe("Test POST /auth/login", () => {
    it("It should respond with 200 success", async () => {
        const user = await request(app)
        .post("/api/auth/login")
        .send({
            email: "haim@gmail.com",
            password: "Haim12345678"
        })
        expect(user.statusCode).toBe(200)
    })

    it("It should respond with 401 error", async () => {
        const res = await request(app)
        .post("/api/auth/login")
        .send({
            email: "invalid@gmail.com",
            password: "Haim123"
        })
        expect(res.statusCode).toBe(401)
      })
})

describe("Test GET /auth/me", () => {
    it("It should respond with 200 success", async () => {
        const user = await request(app)
        .get("/api/auth/me")
        .set("Cookie", token)
        expect(user.statusCode).toBe(200)
    })

    it("It should respond with 401 error", async () => {
        const res = await request(app)
        .get("/api/auth/me")
        expect(res.statusCode).toBe(401)
      })
})

describe("Test patch /auth/me", () => {
    it("It should respond with 200 success", async () => {
        const res = await request(app)
        .patch("/api/auth/me")
        .set("Cookie", token)
        .send({
            email: "newBen@gmail.com",
            name: "newBen"
        })
        expect(res.statusCode).toBe(200)
    })
})

describe("Test post /auth/change-password", () => {
    it("It should respond with 200 success", async () => {
        const res = await request(app)
        .post("/api/auth/change-password")
        .set("Cookie",token )
        .send({
            currentPassword: "Haim12345678",
            newPassword: "newPassword12345678"
        })
        expect(res.statusCode).toBe(200)
    })
})
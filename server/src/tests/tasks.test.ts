import request from "supertest";
import app from '../app';
import { connectDB } from "../db/mongoose";
import mongoose from "mongoose";

let token = "";
let projectId = "";
let taskId = "";


beforeAll(async () => {
    await connectDB();
    const res = await request(app)
    .post("/api/auth/register")
    .send({
        name: "yosi",
        email: "yosi@example.com",
        password: "yosi12345678"
    });

    // const loginUser = await request(app)
    //     .post("/api/auth/login")
    //     .send({
    //         email: "yosi@example.com",
    //         password: "yosi12345678"
    //     })
    token = res.body.token

    const project = await request(app)
        .post("/api/projects/projects")
        // .set("Cookie", token)
        .send({ name: "test task" });
    projectId = project.body._id;
});

afterAll(async () => {
    await mongoose.connection.dropDatabase();
    await mongoose.connection.close();
});

describe("Test GET /projectId/tasks", () => {
    it("It should respond with 200 success", async () => {
        const res = await request(app)
        .get(`/api/${projectId}/tasks`)
        // .set("Cookie", token)
        expect(res.statusCode).toBe(401)
    })
    // it("It should respond with 200 success", async () => {
    //     const res = await request(app)
    //     .get(`/api/${projectId}/tasks`)
    //     .set("Cookie", token)
    //     expect(res.statusCode).toBe(200)
    // })
})

// describe("Test POST /projectId/tasks", () => {
//     it("It should respond with 201 created", async () => {
//         const res = await request(app)
//         .post(`/api/${projectId}/tasks`)
//         .set("Cookie", token)
//         .send({
//             title: "new task",
//             description: "testing new task",
//             assigneeName: "task",
//         })
//         expect(res.statusCode).toBe(201)
//     })
// })


// describe("Test PATCH /projectId/tasks/taskId", () => {
//     it("It should respond with 200 updated", async () => {
//         const res = await request(app)
//             .post(`/api/${projectId}/tasks`)
//             .set("Cookie", token)
//             .send({
//                 title: "new task",
//                 description: "testing new task",
//                 assigneeName: "task",
//             })

//         taskId = res.body._id
//         const task = await request(app)
//             .patch(`/api/${projectId}/tasks/${res.body._id}`)
//             .set("Cookie", token)
//             .send({
//             title: "update task",
//             description: "testing update task",
//             assigneeName: "update task",
//         })
//         expect(task.statusCode).toBe(200)
//     })

//     it("It should respond with 200 deleted", async () => {
//         const task = await request(app)
//             .delete(`/api/${projectId}/tasks/${taskId}`)
//             .set("Cookie", token)
//         expect(task.statusCode).toBe(200)
//     })
// })
import supertest from "supertest";
import { getConnection, getRepository } from "typeorm";
import app,{ init } from "../../src/app";

import User from "../../src/entities/User";

beforeAll(async () => {
    await init();
})

beforeEach(async () => {
    await getRepository(User).query('DELETE FROM users');
})

afterAll(async () => {
    await getConnection().close();
})

describe("POST /sign-up", () => {
    it("should return status 400 for invalid e-mail", async () => {
        const body = {
            email: "asd",
            password: "aloha",
            confirmPassword: "aloha"
        }
        const result = await supertest(app).post("/sign-up").send(body);
        expect(result.status).toBe(400);
    });

    it("should return status 409 for e-mail already in use", async () => {
        const body = {
            email: "asd@asd.com",
            password: "aloha",
            confirmPassword: "aloha"
        }
        await getRepository(User).insert({ email: body.email, password: body.password });
        const result = await supertest(app).post("/sign-up").send(body);
        expect(result.status).toBe(409);
    });

    it("should return status 400 for unmatching password and confirm", async () => {
        const body = {
            email: "asd@asd.com",
            password: "aloha",
            confirmPassword: "incorrectAloha"
        }
        const result = await supertest(app).post("/sign-up").send(body);
        expect(result.status).toBe(400);
    });

    it("should return status 201 for valid request", async () => {
        const body = {
            email: "asd@asd.com",
            password: "aloha",
            confirmPassword: "aloha"
        }
        const result = await supertest(app).post("/sign-up").send(body);
        expect(result.status).toBe(201);
    });
})
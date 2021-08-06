import supertest from "supertest";
import { getConnection, getRepository } from "typeorm";
import app,{ init } from "../../src/app";

import Session from "../../src/entities/Session";
import User from "../../src/entities/User";
import * as userFactory from "../factories/userFactory";

beforeAll(async () => {
    await init();
})

beforeEach(async () => {
    await getRepository(Session).query('DELETE FROM sessions');
    await getRepository(User).query('DELETE FROM users');
})

afterAll(async () => {
    await getConnection().close();
})

describe("POST /sign-in", () => {
    it("should return status 400 for invalid e-mail", async () => {
        const body = {
            email: "invalid@email.com",
            password: "doesntmatter"
        }
        const result = await supertest(app).post("/sign-in").send({ body });
        expect(result.status).toBe(400);
    });

    it("should return status 401 for invalid password", async () => {
        const user = await userFactory.createUser();
        const body = {
            email: user.email,
            password: "invalidpassword"
        }
        const result = await supertest(app).post("/sign-in").send(body);
        expect(result.status).toBe(401);
    });

    it("should return status 200 and a token for valid signin", async () => {
        const user = await userFactory.createUser();
        const body = {
            email: user.email,
            password: user.password
        }
        const result = await supertest(app).post("/sign-in").send(body);
        
        expect(result.status).toBe(200);
        expect(result.body).toEqual(expect.objectContaining({ token: expect.any(String) }))
    });
})
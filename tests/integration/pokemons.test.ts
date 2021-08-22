import supertest from "supertest";
import { getConnection, getRepository } from "typeorm";
import app,{ init } from "../../src/app";

import Session from "../../src/entities/Session";
import User from "../../src/entities/User";
import * as sessionFactory from "../factories/sessionFactory";

beforeAll(async () => {
    await init();
});

beforeEach(async () => {
    await getRepository(Session).query('DELETE FROM sessions');
    await getRepository(User).query('DELETE FROM users');
})

afterAll(async () => {
    await getConnection().close();
});

describe("GET /pokemons", () => {
    it("should return status 401 for invalid token", async () => {
        const result = await supertest(app).get("/pokemons");
        expect(result.status).toBe(401)
    });

    it("should return an array of pokemons for valid token", async () => {
        const token = await sessionFactory.createSession();
        const result = await supertest(app).get("/pokemons").set("authorization", `Bearer ${token}`);
        expect(result.body).toEqual(expect.any(Array));
    })
})
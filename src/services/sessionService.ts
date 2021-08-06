import Session from "../entities/Session";
import { getRepository } from "typeorm";
import { v4 as uuidv4 } from "uuid";

export async function createUserSession(userId: number) {
    const token = uuidv4();
    await getRepository(Session).insert({ token, userId });
    return token
}

export async function authSession(token: string) {
    const session = await getRepository(Session).findOne({ where: { token }});
    return session ? session : null;
}
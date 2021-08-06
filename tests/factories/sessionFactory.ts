import { getRepository } from "typeorm";

import Session from "../../src/entities/Session";
import * as userFactory from "./userFactory";

export async function createSession () {
    const user = await userFactory.createUser();

    const session = getRepository(Session).create({
    userId: user.id,
    token: "123456"
    });

    const token = (await getRepository(Session).save(session)).token;

    return token
}

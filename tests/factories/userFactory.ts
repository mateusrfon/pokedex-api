import { getRepository } from "typeorm";
import bcrypt from "bcrypt";

import User from "../../src/entities/User";

export async function createUser () {
  const password = "123456";
  const user = await getRepository(User).create({
    email: "email@email.com",
    password: bcrypt.hashSync(password, 10)
  });

  await getRepository(User).save(user);

  return { ...user, password };
}

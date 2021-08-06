import { Request, Response } from "express";
import { getRepository } from "typeorm";
import bcrypt, { hash } from "bcrypt";

import User from "../entities/User";

export async function getUsers () {
  const users = await getRepository(User).find({
    select: ["id", "email"]
  });
  
  return users;
}

export async function getUserByEmail (email: string) {
  const user = await getRepository(User).findOne({ where: { email }});
  return user
}

export async function createUser(email: string, password: string) {
  const hashPassword = bcrypt.hashSync(password, 10);
  const user = { email, password: hashPassword };
  await getRepository(User).save(user);
}
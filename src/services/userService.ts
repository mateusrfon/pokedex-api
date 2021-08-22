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
  return user ? user : null
}

export async function createUser(email: string, password: string) {
  const hashPassword = bcrypt.hashSync(password, 10);
  const user = { email, password: hashPassword };
  const insertedUser = await getRepository(User).save(user);
  return { email: insertedUser.email }
}

export async function signInValidation(email: string, password: string) {
  const hashPassword = (await getRepository(User).findOne({ where: { email } })).password;
  const validation = (bcrypt.compareSync(password, hashPassword));
  return validation
}
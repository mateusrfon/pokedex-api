import { Request, Response } from "express";

import * as userService from "../services/userService";
import * as sessionService from "../services/sessionService";
import { signInBodySchema, signUpBodySchema } from "./schemas";

export async function getUsers (req: Request, res: Response) {
  try {
    const users = await userService.getUsers();
    res.send(users);
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
}

interface SignUpBody {
  email: string,
  password: string,
  confirmPassword: string,
}

export async function signUp (req: Request, res: Response) {
  const { email, password, confirmPassword } = req.body as SignUpBody;
  
  if (signUpBodySchema.validate(req.body).error) return res.sendStatus(400);

  const user = await userService.getUserByEmail(email);
  if (user !== null) return res.sendStatus(409);

  if (password !== confirmPassword) return res.sendStatus(400);

  await userService.createUser(email, password);
  
  res.sendStatus(201);
}

interface SignInBody {
  email: string,
  password: string,
}

export async function signIn (req: Request, res: Response) {
  const { email, password } = req.body as SignInBody;

  if (signInBodySchema.validate(req.body).error) return res.sendStatus(400);
  const user = await userService.getUserByEmail(email);
  if (user === null) return res.sendStatus(400);
  
  const validation = await userService.signInValidation(email, password);
  if (!validation) return res.sendStatus(401);
  
  const token = await sessionService.createUserSession(user.id);
  res.send({ token });
}
import { Request, Response } from "express";
import Joi from "joi";

import * as userService from "../services/userService";

export async function getUsers (req: Request, res: Response) {
  try {
    const users = await userService.getUsers();
    res.send(users);
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
}

export async function signUp (req: Request, res: Response) {
  const { email, password, confirmPassword } = req.body as SignUpBody;
  
  if (signUpBodySchema.validate(req.body).error) return res.sendStatus(400);

  const user = await userService.getUserByEmail(email);
  if (user) return res.sendStatus(409);

  if (password !== confirmPassword) return res.sendStatus(400);

  await userService.createUser(email, password);
  
  res.sendStatus(201);
}

const signUpBodySchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
  confirmPassword: Joi.string().required()
});

interface SignUpBody {
  email: string,
  password: string,
  confirmPassword: string,
}

import  { Request, Response } from "express";
import { User } from "../models/User";
import bcrypt  from "bcryptjs";


export const createUser = async (req: Request, res: Response) => {
  const { name, email, password } = req.body;

  const foundEmail = await User.findOne({ email: email });

  if (foundEmail?.email) {
    return res.sendStatus(400);
  }

  const passwordHash = await bcrypt.hash(password, 8);

  await User.create({ name, email, password: passwordHash });
  return res.sendStatus(201);
};

import { Request, Response } from "express";
import { User } from "../models/User";
import bcrypt  from "bcryptjs";


export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email: email });
  if (!user) {
    return res.sendStatus(404);
  }

  const passwordMatch = await bcrypt.compare(password, user.password);

  if (!passwordMatch) {
    return res.sendStatus(404);
  }

  return res.json({ email, name: user.name });
};

import  { Request, Response } from "express";
import { ShortUrl } from "../models/shortUrl"
const nanoid = require("nanoid");


export const createShortUrl = async (req: Request, res: Response) => {
  const { full, email } = req.body;

  if (email) {
    const foundUrl = await ShortUrl.findOne({ full, email });
    if (foundUrl) {
      return res.json({ full: foundUrl.full, short: foundUrl.short });
    }
  }
  const url = await ShortUrl.create({ full, email: email || "",  short: nanoid(5) });
  return res.json({ full: url.full, short: url.short });
};

import { Request, Response } from "express";
import { ShortUrl } from "../models/shortUrl"


export const getUserUrls = async (req: Request, res: Response) => {
  const email = req.params.email;

  const shortUrls = await ShortUrl.find({ email }).sort({ clicks: -1 });
  return res.json(shortUrls);
};

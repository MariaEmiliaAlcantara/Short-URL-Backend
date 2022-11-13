import { Request, Response } from "express";
import { ShortUrl } from "../models/shortUrl"


export const getAllUrls = async (req: Request, res: Response) => {
  const shortUrls = await ShortUrl.find().sort({ clicks: -1 }).limit(100);
  return res.json(shortUrls);
};

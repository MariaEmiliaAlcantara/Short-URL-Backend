import { Request, Response } from "express";
import { ShortUrl } from "../models/shortUrl"


export const getShortUrl = async (req: Request, res: Response) => {
  const shortUrl = await ShortUrl.findOne({ short: req.params.shortUrl });

  if (shortUrl == null) return res.sendStatus(404);

  shortUrl.clicks++;
  shortUrl.save();

  return res.json({
    full: shortUrl.full,
    short: shortUrl.short,
    clicks: shortUrl.clicks,
  });
};

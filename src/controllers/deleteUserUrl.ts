import { Request, Response } from "express";
import { ShortUrl } from "../models/shortUrl"


export const deleteUserUrl = async (req: Request, res: Response) => {
  const { short } = req.params;
  const url = await ShortUrl.find({ short }).remove().exec();
  return res.sendStatus(200);
};

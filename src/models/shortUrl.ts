import { Schema, model } from "mongoose";
import shortid  from "shortid"

export interface IShortUrl {
  full: string;
  short: string;
  clicks: number;
  email?: string;
}

const shortUrlSchema = new Schema<IShortUrl>(
  {
    full: {
      type: String,
      required: true,
    },
    short: {
      type: String,
      required: true,
      default: shortid.generate,
    },
    clicks: {
      type: Number,
      required: true,
      default: 0,
    },
    email: {
      type: String,
      required: false,
    },
  });

export const ShortUrl = model("ShortUrl", shortUrlSchema);

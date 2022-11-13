import express from "express";
import { connect } from "mongoose";
import cors from "cors";

import { createShortUrl } from "./controllers/createShortUrl"
import { createUser } from "./controllers/createUser"
import { getShortUrl } from "./controllers/getShortUrl"
import { getAllUrls } from "./controllers/getAllUrls"
import { getUserUrls } from "./controllers/getUserUrls"
import { login } from "./controllers/login"
import { deleteUserUrl } from "./controllers/deleteUserUrl"

const app = express();

app.use(cors());

app.use(express.json());

connect(
  "mongodb+srv://mariaemila:tub4r40@cluster0.e1cn3fh.mongodb.net/?retryWrites=true&w=majority",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);

app.use(express.urlencoded({ extended: false }));

app.get("/getAllUrls", getAllUrls);

app.get("/getUserUrls/:email", getUserUrls);

app.post("/shortUrls", createShortUrl);

app.get("/url/:shortUrl", getShortUrl);

app.post("/createUser", createUser);

app.post("/login", login);

app.delete("/deleteUserUrl/:short", deleteUserUrl);

app.listen(process.env.PORT || 5000);

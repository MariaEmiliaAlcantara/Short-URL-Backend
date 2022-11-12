const express = require("express");
const mongoose = require("mongoose");

const { getShortUrl } = require("./controllers/getShortUrl");
const { getAllUrls } = require("./controllers/getAllUrls");
const { getUserUrls } = require("./controllers/getUserUrls");
const { createShortUrl } = require("./controllers/createShortUrl");
const { createUser } = require("./controllers/createUser");
const { login } = require("./controllers/login");
const { deleteUserUrl } = require("./controllers/deleteUserUrl");

const cors = require("cors");

const app = express();

app.use(cors());

app.use(express.json());

mongoose.connect(
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

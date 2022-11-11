const express = require("express");
const mongoose = require("mongoose");
const ShortUrl = require("./models/shortUrl");
const User = require("./models/User");
const bcrypt = require("bcryptjs");
const shortId = require("shortid");

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

app.get("/getAllUrls", async (req, res) => {
  const shortUrls = await ShortUrl.find();
  return res.json(shortUrls);
});

app.post("/shortUrls", async (req, res) => {
  const { full } = req.body;
  const url = await ShortUrl.create({ full });

  return res.json(url);
});

app.get("/url/:shortUrl", async (req, res) => {
  const shortUrl = await ShortUrl.findOne({ short: req.params.shortUrl });
  if (shortUrl == null) return res.sendStatus(404);

  shortUrl.clicks++;
  shortUrl.save();

  return res.json({ full: shortUrl.full });
});

app.post("/registerUser", async (req, res) => {
  const { name, email, password } = req.body;
  console.log(req.body);

  const foundEmail = await User.findOne({ email: email });
  console.log("foundemail:", foundEmail);
  if (foundEmail?.email) {
    return res.sendStatus(400);
  }

  const passwordHash = await bcrypt.hash(password, 8);

  await User.create({ name, email, password: passwordHash });
  return res.sendStatus(201);
});

app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email: email });
  if (!user) {
    console.log("entrei no if do user");
    return res.sendStatus(404);
  }

  const passwordMatch = await bcrypt.compare(password, user.password);

  if (!passwordMatch) {
    console.log("entrei no if do password");
    return res.sendStatus(404);
  }

  return res.sendStatus(200);
});

app.listen(process.env.PORT || 5000);

const User = require("../models/User");
const bcrypt = require("bcryptjs");

const createUser = async (req, res) => {
  const { name, email, password } = req.body;

  const foundEmail = await User.findOne({ email: email });

  if (foundEmail?.email) {
    return res.sendStatus(400);
  }

  const passwordHash = await bcrypt.hash(password, 8);

  await User.create({ name, email, password: passwordHash });
  return res.sendStatus(201);
};

module.exports = { createUser };

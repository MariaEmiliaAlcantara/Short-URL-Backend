const sign = require("jsonwebtoken").sign;
const User = require("../models/User");
const bcrypt = require("bcryptjs");

const login = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email: email });
  if (!user) {
    return res.sendStatus(404);
  }

  const passwordMatch = await bcrypt.compare(password, user.password);

  if (!passwordMatch) {
    return res.sendStatus(404);
  }

  return res.json({ email });
};

module.exports = { login };

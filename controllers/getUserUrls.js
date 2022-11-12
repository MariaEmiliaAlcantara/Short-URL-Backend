const ShortUrl = require("../models/shortUrl");

const getUserUrls = async (req, res) => {
  const email = req.params.email;

  const shortUrls = await ShortUrl.find({ email }).sort({ clicks: -1 });
  return res.json(shortUrls);
};

module.exports = {
  getUserUrls,
};

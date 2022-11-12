const ShortUrl = require("../models/shortUrl");

const getAllUrls = async (req, res) => {
  const shortUrls = await ShortUrl.find().sort({ clicks: -1 }).limit(100);
  return res.json(shortUrls);
};

module.exports = {
  getAllUrls,
};

const ShortUrl = require("../models/shortUrl");

const createShortUrl = async (req, res) => {
  const { full, email } = req.body;

  if (email) {
    const foundUrl = await ShortUrl.findOne({ full, email });
    if (foundUrl) {
      return res.json({ full: foundUrl.full, short: foundUrl.short });
    }
  }
  const url = await ShortUrl.create({ full, email: email || "" });
  return res.json({ full: url.full, short: url.short });
};

module.exports = {
  createShortUrl,
};

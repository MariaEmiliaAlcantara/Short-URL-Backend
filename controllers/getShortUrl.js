const ShortUrl = require("../models/shortUrl");

const getShortUrl = async (req, res) => {
  const shortUrl = await ShortUrl.findOne({ short: req.params.shortUrl });

  if (shortUrl == null) return res.sendStatus(404);

  shortUrl.clicks++;
  shortUrl.save();

  return res.json({
    full: shortUrl.full,
    short: shortUrl.short,
    clicks: shortUrl.clicks,
  });
};

module.exports = { getShortUrl };

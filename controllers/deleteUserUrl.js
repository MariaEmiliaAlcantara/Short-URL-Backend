const ShortUrl = require("../models/shortUrl");

const deleteUserUrl = async (req, res) => {
  const { short } = req.params;
  const url = await ShortUrl.find({ short }).remove().exec();
  return res.sendStatus(200);
};

module.exports = {
  deleteUserUrl,
};

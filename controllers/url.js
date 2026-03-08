const URL = require("../models/url");
const shortid = require("shortid");

const generateNewShortUrl = async (req, res) => {
  if (!req?.body?.url) {
    return res.status(400).json({ success: false, message: "url is required" });
  }

  const shortID = shortid();
  await URL.create({
    shortId: shortID,
    redirectUrl: req.body.url,
    vistiHistory: [],
  });

  return res.render('home', {
    id: shortID
  })
  // return res.json({ id: shortID });
};

const shortIdLinkView = async (req, res) => {
  const shortId = req.params.shortId;
  const entry = await URL.findOneAndUpdate(
    {
      shortId,
    },
    {
      $push: {
        visitHistory: {
          timestamp: Date.now(),
        },
      },
    }
  );
  res.redirect(entry.redirectUrl);
};

const getAnalaytics = async (req, res) => {
  const shortId = req.params.shortId;
  const result = await URL.findOne({ shortId });

  return res.json({
    totalClicks: result.visitHistory.length,
    analytics: result.visitHistory,
  });
};

module.exports = { generateNewShortUrl, shortIdLinkView ,getAnalaytics};

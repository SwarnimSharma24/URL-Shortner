const express = require("express");
const { generateNewShortUrl, shortIdLinkView,getAnalaytics } = require("../controllers/url");
const router = express.Router();

/** all routes for short url */
router.post("/shortURL", generateNewShortUrl);
router.get("/:shortId", shortIdLinkView);
router.get("/analytics/:shortId", getAnalaytics)

module.exports = router;

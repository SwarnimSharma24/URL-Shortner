const express = require("express");
const router = express.Router();
const URL = require("../models/url");
const path = require("path");
const app = express();

/** routes for all ssr files */
router.get("/", async (req, res) => {
  const allUrls = await URL.find({});
  res.render("home", {
    urls: allUrls,
    req: req,
  });
});

module.exports = router;

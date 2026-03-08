const express = require("express");
const router = express.Router();
const URL = require("../models/url");
const path = require("path");
const app = express();

/** routes for all ssr files */
router.get("/",async (req, res) => {
    const AllData =  await URL.find({})
  return res.render("home", {
    url: AllData
  });
});

module.exports = router;

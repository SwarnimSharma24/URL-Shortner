const mongoose = require("mongoose");

const urlSchema = new mongoose.Schema(
  {
    shortId: {
      type: String,
      required: true,
      unique: true,
    },
    redirectUrl: {
      type: String,
      required: true,
    },
    visitHistory: [
      {
        timestamp: { type: Number },
      },
    ],
  },
  { timestamps: true }
);

// Format timestamps to Indian 12-hour format when converting to JSON
urlSchema.set("toJSON", {
  transform: function (doc, ret) {
    const options = {
      timeZone: "Asia/Kolkata",
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: true,
    };

    if (ret.createdAt) {
      ret.createdAt = new Date(ret.createdAt).toLocaleString("en-IN", options);
    }

    if (ret.updatedAt) {
      ret.updatedAt = new Date(ret.updatedAt).toLocaleString("en-IN", options);
    }

    return ret;
  },
});

const URL = mongoose.model("url", urlSchema);

module.exports = URL;

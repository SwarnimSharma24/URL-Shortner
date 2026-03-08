const express = require("express");
const path = require("path");
const urlRouter = require("./routes/url");
const ssrRoutes = require("./routes/ssr");
const { connectToMongoDB } = require("./connect");

const app = express();
app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));
/**formats allowed for our apis */
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const PORT = 8001;

connectToMongoDB("mongodb://localhost:27017/short-url").then(() =>
  console.log("MongiDB Connected")
);

/** for short urls */
app.use("/api", urlRouter);

/** for SSR */
app.use("/", ssrRoutes);

app.listen(PORT, () => {
  console.log(`Your server is listenin on http://localhost:${PORT}`);
});

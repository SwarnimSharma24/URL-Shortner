require("dotenv").config();
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

const PORT = process.env.PORT  || 8000;

connectToMongoDB(process.env.MONGO_URL).then(() =>
  console.log("MongoDB Connected")
);

/** for short urls */
app.use("/api", urlRouter);

/** for SSR */
app.use("/", ssrRoutes);

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server running on port ${PORT}`);
});

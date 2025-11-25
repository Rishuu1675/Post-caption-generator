
const express = require("express");
const connectDB = require("./db/db");
const cookie_parser = require("cookie-parser");
const userRoute = require("./routes/user.routes");
const postRoute = require("./routes/post.routes");

const app = express();
connectDB();
app.use(express.json());
app.use(cookie_parser());

app.use("/api/auth", userRoute);
app.use("/api/post", postRoute);

module.exports = app;

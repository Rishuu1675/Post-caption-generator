const express = require("express");
const authMiddleware = require("../middlewares/auth.middleware");
const multer = require("multer");
const { createPostController } = require("../controllers/post.controller");

const route = express.Router();

const upload = multer({ storage: multer.memoryStorage() });

route.post("/", authMiddleware, upload.single("image"), createPostController);

module.exports = route;

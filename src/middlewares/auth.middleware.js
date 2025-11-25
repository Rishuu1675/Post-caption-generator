const jwt = require("jsonwebtoken");
const userModel = require("../models/user.models");

async function authMiddleware(req, res, next) {
  const { token } = req.cookies;

  if (!token) {
    return res.status(401).json({
      msg: "Token Is Missing",
    });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await userModel.findOne({
      _id: decoded.id,
    });

    req.user = user;

    next();
  } catch (err) {
    return res.status(401).json({
      msg: "Invalid Token",
    });
  }
}

module.exports = authMiddleware;

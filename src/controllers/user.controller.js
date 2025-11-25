const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const userModel = require("../models/user.models");

async function registerController(req, res) {
  const { username, password } = req.body;

  const existuser = await userModel.findOne({
    username,
  });

  if (existuser) {
    return res.status(400).json({
      msg: "User already exists",
    });
  }

  const newuser = await userModel.create({
    username,
    password: await bcrypt.hash(password, 10),
  });

  const token = jwt.sign(
    {
      id: newuser._id,
    },
    process.env.JWT_SECRET
  );

  res.cookie("token", token);

  return res.status(201).json({
    msg: "User registered successfully",
  });
}

async function loginController(req, res) {
  const { username, password } = req.body;

  const user = await userModel.findOne({
    username,
  });

  if (!user) {
    return res.status(400).json({
      msg: "Invalid Username",
    });
  }

  const validpassword = await bcrypt.compare(password, user.password);

  if (!validpassword) {
    return res.status(400).json({
      msg: "Invalid password",
    });
  }

  const token = jwt.sign(
    {
      id: user._id,
    },
    process.env.JWT_SECRET
  );

  res.cookie("token", token);

  res.status(200).json({
    msg: "User logged in successfully",
  });
}

module.exports = {
  registerController,
  loginController,
};

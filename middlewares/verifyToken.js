const jwt = require("jsonwebtoken");
const userModel = require("../models/userModel");

module.exports = async function (req, res, next) {
  const token = req.header("auth-token");
  if (!token) {
    return res.status(401).json({ message: "Access denied" });
  }
  try {
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await userModel.findOne({ email: verified.email });
    next();
  } catch (err) {
    res.status(400).json({ message: "Invalid token" });
  }
};

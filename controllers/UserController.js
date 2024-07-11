const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const UserModel = require("../models/userModel");

module.exports = {
  register: async function (req, res) {
    try {
      const { email, password } = req.body;
      const userExists = await UserModel.findOne({ email });
      if (userExists) {
        return res.status(400).json({ message: "Email already exists" });
      }
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);
      const user = new UserModel({ email, password: hashedPassword });
      await user.save();
      res.status(201).json({ message: "User created" });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  },
  login: async function (req, res) {
    try {
      const { email, password } = req.body;
      const user = await UserModel.findOne({ email }).lean();
      if (!user) {
        return res.status(400).json({ message: "Invalid credentials" });
      }
      const isPasswordMatch = await bcrypt.compare(password, user.password);
      if (!isPasswordMatch) {
        return res.status(400).json({ message: "Invalid credentials" });
      }
      const token = jwt.sign({ email: user.email }, process.env.JWT_SECRET);
      const { password: userPassword, ...userDataWithoutPassword } = user;
      res.status(200).header("auth-token", token).json(userDataWithoutPassword);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  },
  autoLogin: async function (req, res) {
    const user = await UserModel.findById(req.user._id).select("-password");
    res.status(200).json(user);
  },
};

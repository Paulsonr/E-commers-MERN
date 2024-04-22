const User = require("../model/user.modal");
const { hashPassword, comparePassword } = require("../helper/auth");
//SIGNIN
const Signin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const userDetail = await User.findOne({ email });

    if (!userDetail) {
      res.status(401).json({ message: "User not found!" });
      return;
    }
    const match = await comparePassword(password, userDetail.password);
    if (match) {
      res.status(200).json({ message: "Signin successful!" });
    }
    else {
      res.status(401).json({ message: "Invalid credentials" });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

//SIGNUP

const Signup = async (req, res) => {
  try {
    const { email, password } = req.body;
    const userExist = await User.findOne({ email });
    if (!userExist) {
      const hasedPassword = await hashPassword(password)
      const newUser = await User.create({ email: email, password: hasedPassword });
      res.status(200).json({ message: "Signup successful!", user: newUser });
    } else {
      res
        .status(401)
        .json({ message: "User already exist with similar email-id!" });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = { Signin, Signup };

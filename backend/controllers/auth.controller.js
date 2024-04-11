const User = require("../model/user.modal");

//SIGNIN
const Signin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const userDetail = await User.findOne({ email: email, password: password });
    if (userDetail) {
      res.status(200).json({ message: "Signin successful!" });
    } else {
      res.status(401).json({ message: "User not found!" });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

//SIGNUP

const Signup = async (req, res) => {
  try {
    const { email } = req.body;
    const userExist = await User.findOne({ email });
    if (!userExist) {
      const newUser = await User.create(req.body);
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

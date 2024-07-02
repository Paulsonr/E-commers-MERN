const User = require("../model/user.modal");
const { hashPassword, comparePassword } = require("../helper/auth");
const jwt = require("jsonwebtoken");
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
      jwt.sign(
        { email: userDetail.email, id: userDetail._id, name: userDetail.name },
        process.env.JWT_SECRET,
        {},
        (err, token) => {
          if (err) throw err;
          else res.cookie("token", token).json(userDetail);
        }
      );
      // res.status(200).json({ message: "Signin successful!" });
    } else {
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
      const hasedPassword = await hashPassword(password);
      const newUser = await User.create({
        email: email,
        password: hasedPassword,
      });
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

const Profile = (req, res) => {
  try {
    const { token } = req.cookies;
    if (token) {
      jwt.verify(token, process.env.JWT_SECRET, {}, (err, userDetail) => {
        if (err) throw err;
        res.status(200).json(userDetail);
      });
    } else {
      res.json(null);
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const GetUserDetails = async (req, res) => {
  try {
    const { id } = req.params;
    const userDetail = await User.findOne({ _id: id });

    if (!userDetail) {
      res.status(401).json({ message: "User not found!" });
      return;
    }
    res.status(200).json(userDetail);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const UpdateProfile = async (req, res) => {
  try {
    const { id: _id } = req.body;
    const userDetails = await User.findByIdAndUpdate(_id, req.body);
    if (!userDetails)
      return res.status(404).json({ message: "User not found!" });
    const updatedUser = await User.findById(userDetails.id);
    res.status(200).json(updatedUser);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
module.exports = { Signin, Signup, Profile, GetUserDetails, UpdateProfile };

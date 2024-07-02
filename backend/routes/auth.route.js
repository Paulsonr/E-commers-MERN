const express = require("express");
const router = express.Router();
const {
  Signin,
  Signup,
  Profile,
  UpdateProfile,
  GetUserDetails,
} = require("../controllers/auth.controller");

router.post("/signin", Signin);
router.post("/signup", Signup);
router.get("/profile", Profile);
//get user details
router.get("/user/:id", GetUserDetails);
router.put("/profile", UpdateProfile);

module.exports = router;

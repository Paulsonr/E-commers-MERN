const express = require("express");
const router = express.Router();
const { Signin, Signup, Profile } = require("../controllers/auth.controller");

router.post("/signin", Signin);
router.post("/signup", Signup);
router.get("/profile", Profile);

module.exports = router;

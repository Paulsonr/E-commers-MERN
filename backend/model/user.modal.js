const mongoose = require("mongoose");

const UserSchema = mongoose.Schema({
  email: {
    type: String,
    required: [true, "Please enter an email"],
  },
  password: {
    type: String,
    required: [true, "Please enter a password"],
  },
});

const User = mongoose.model("User", UserSchema);

module.exports = User;

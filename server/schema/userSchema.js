const mongoose = require("mongoose");

// Create a schema for the User model
const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String },
  googleId: { type: String },
  picture: { type: String },
  profile: {
    name: { type: String },
    mobile: { type: String },
    instagram: { type: String },
    youtube: { type: String },
    email: { type: String },
  },
});

// Create a User model based on the schema
const User = mongoose.model("User", userSchema);

module.exports = User;

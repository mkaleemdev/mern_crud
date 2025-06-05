const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    imgUrl : String,
    name: String,
    email: {
      type: String,
      required: true,
      unique: true,
    },
    mobile: String,
    DOB: Date,
    gender: String,
  },
  { timestamps: true }
);

module.exports = mongoose.model("crud", userSchema);

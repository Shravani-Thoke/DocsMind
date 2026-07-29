const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      minlength: [13, "Enter a valid email"],
      trim: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: function () {
        return !this.googleId;
      },
      minlength: [3, "password must be at least 3 characters long"],
      trim: true,
    },

    googleId: {
      type: String,
      default: null,
    },

    avatar: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  },
);

const UserModel = mongoose.model("User", userSchema);

module.exports = UserModel;

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const user = new Schema(
    {
        password: {
          type: String,
          required: [true, 'Set password for user'],
        },
        email: {
          type: String,
          required: [true, 'Email is required'],
          unique: true,
        },
        subscription: {
          type: String,
          enum: ["starter", "pro", "business"],
          default: "starter"
        },
        token: {
        type: String,
        default: null
        },
        avatarURL: {
          type: String,
          required: [true, 'Avatar is required'],
  
        }
      },
    { versionKey: false }
);

const User = mongoose.model("user", user);

module.exports = User;
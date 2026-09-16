const { Schema } = require("mongoose");

const UserSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
    },
    fullName: {
      type: String,
      required: true,
      trim: true,
    },
    funds: {
      type: Number,
      default: 100000, // ₹1,00,000 default balance for trading
    },
  },
  { timestamps: true }
);

module.exports = { UserSchema };

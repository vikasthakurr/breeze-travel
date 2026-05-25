import mongoose from "mongoose";

const isDummyMode = process.env.ALLOW_DUMMY_AUTH_DATA === "true";

const userSchema = new mongoose.Schema(
  {
    username: { type: String, required: !isDummyMode, trim: true, default: "" },
    number: { type: String, required: !isDummyMode, unique: !isDummyMode, trim: true, default: "" },
    email: {
      type: String,
      required: !isDummyMode,
      unique: !isDummyMode,
      trim: true,
      lowercase: true,
      default: "",
    },
    password: { type: String, required: !isDummyMode, default: "" },
    role: { type: String, enum: ["user", "admin"], default: "user" },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("User", userSchema);

export default User;

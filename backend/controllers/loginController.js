import CryptoJS from "crypto-js";
import jwt from "jsonwebtoken";

import User from "../model/user.model.js";
import { comparePassword, hashPassword } from "../utils/password.js";

const loginHandler = async (req, res) => {
  try {
    const { number, password } = req.body;

    if (!number || !password) {
      return res.status(400).json({ message: "Mobile number and password are required." });
    }

    const normalizedNumber = String(number).trim();
    const user = await User.findOne({ number: normalizedNumber });
    if (!user) {
      return res.status(401).json({ message: "Incorrect Mobile Number" });
    }

    let isPasswordValid = comparePassword(password, user.password);

    if (!isPasswordValid && process.env.PASSWORD_SECRET_KEY) {
      const legacyDecodedPassword = CryptoJS.AES.decrypt(
        user.password,
        process.env.PASSWORD_SECRET_KEY,
      ).toString(CryptoJS.enc.Utf8);

      if (legacyDecodedPassword === password) {
        isPasswordValid = true;
        user.password = hashPassword(password);
        await user.save();
      }
    }

    if (!isPasswordValid) {
      return res.status(401).json({ message: "Incorrect password" });
    }

    const { password: hashedPassword, ...rest } = user._doc;
    const accessToken = jwt.sign(
      { id: user._id, username: user.username, role: user.role || "user" },
      process.env.ACCESS_TOKEN,
      { expiresIn: "1d" },
    );

    return res.json({ ...rest, accessToken });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Login failed" });
  }
};

export default loginHandler;

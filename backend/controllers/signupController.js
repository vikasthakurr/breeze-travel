import User from "../model/user.model.js";
import { hashPassword } from "../utils/password.js";

const signupHandler = async (req, res) => {
  try {
    const { username, number, email, password } = req.body;

    if (!username || !number || !email || !password) {
      return res.status(400).json({ message: "All fields are required." });
    }

    const normalizedNumber = String(number).trim();
    const normalizedEmail = String(email).trim().toLowerCase();

    if (process.env.ALLOW_DUMMY_AUTH_DATA !== "true" && !/^\d{10}$/.test(normalizedNumber)) {
      return res.status(400).json({ message: "Mobile number must be 10 digits." });
    }

    const existingUser = await User.findOne({
      $or: [{ number: normalizedNumber }, { email: normalizedEmail }],
    });

    if (existingUser) {
      return res.status(409).json({ message: "User already exists with this email or number." });
    }

    const newUser = new User({
      username: String(username).trim(),
      number: normalizedNumber,
      email: normalizedEmail,
      password: hashPassword(password),
      role: req.body.role === "admin" ? "admin" : "user",
    });

    const savedUser = await newUser.save();
    const { password: hashedPassword, ...rest } = savedUser._doc;
    return res.status(201).json(rest);
  } catch (err) {
    console.log(err);
    if (err.code === 11000) {
      return res.status(409).json({ message: "Email or number already registered." });
    }
    return res.status(500).json({ message: "Error creating a user" });
  }
};

export default signupHandler;

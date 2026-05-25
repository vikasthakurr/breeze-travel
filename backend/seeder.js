import mongoose from "mongoose";
import dotenv from "dotenv";

import Hotel from "./model/hotel.model.js";
import Category from "./model/category.model.js";
import User from "./model/user.model.js";
import { hashPassword } from "./utils/password.js";

import hotels from "./data/hotels.js";
import categories from "./data/categories.js";

dotenv.config();

const dummyUsers = [
  {
    username: "Breeze Admin",
    number: "9999999999",
    email: "admin@breezetravel.com",
    password: "Admin@1234",
    role: "admin",
  },
  {
    username: "Test User One",
    number: "8888888888",
    email: "user1@breezetravel.com",
    password: "User@1234",
    role: "user",
  },
  {
    username: "Test User Two",
    number: "7777777777",
    email: "user2@breezetravel.com",
    password: "User@1234",
    role: "user",
  },
];

const connectDB = async () => {
  await mongoose.connect(process.env.DATABASE_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
};

const seedData = async () => {
  try {
    await connectDB();

    await Hotel.deleteMany({});
    await Category.deleteMany({});
    await User.deleteMany({});

    await Hotel.insertMany(hotels.data);
    await Category.insertMany(categories.data);

    const usersWithEncryptedPasswords = dummyUsers.map((user) => ({
      ...user,
      password: hashPassword(user.password),
    }));

    await User.insertMany(usersWithEncryptedPasswords);

    console.log("Dummy data seeded successfully.");
    process.exit(0);
  } catch (error) {
    console.error("Seeder failed:", error.message);
    process.exit(1);
  }
};

seedData();

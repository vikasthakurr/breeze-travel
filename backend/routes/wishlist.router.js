import express from "express";

import { verifyUser } from "../middleware/verfiyuser.js";

import {
  createWishlistHandler,
  deleteWishlistHandler,
  getWishlistHandler,
} from "../controllers/wishlistController.js";

const router = express.Router();

router.route("/")
    .post(verifyUser, createWishlistHandler)

router.route("/:id")
    .delete(verifyUser, deleteWishlistHandler)

router.route("/")
    .get(verifyUser, getWishlistHandler)

export default router;

import express from "express";
const router = express.Router();

import categoryHandler from "../controllers/categoryController.js";

router.route("/")
    .get(categoryHandler)

export default router;

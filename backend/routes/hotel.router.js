import express from "express";
const router = express.Router();

import getAllHotelHandler from "../controllers/hotelController.js";

router.route("/")
    .get(getAllHotelHandler)

export default router;

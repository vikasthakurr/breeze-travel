import express from "express";
const router = express.Router();

import singlehotelHandler from "../controllers/singleHoterController.js";

router.route("/:id")
    .get(singlehotelHandler)

export default router;

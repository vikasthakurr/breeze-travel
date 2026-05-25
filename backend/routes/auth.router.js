import express from "express";

import signupHandler from "../controllers/signupController.js";
import loginHandler from "../controllers/loginController.js";

const router = express.Router();

router.route("/register")
    .post(signupHandler)

router.route("/login")
    .post(loginHandler)

export default router;

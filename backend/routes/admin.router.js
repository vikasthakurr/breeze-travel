import express from "express";
import { verifyUser, verifyAdmin } from "../middleware/verfiyuser.js";

import {
  getAdminHotelsHandler,
  createAdminHotelHandler,
  deleteAdminHotelHandler,
  updateAdminHotelHandler,
  getAdminUsersHandler,
} from "../controllers/adminController.js";

const router = express.Router();
router.use(verifyUser, verifyAdmin);

router.route("/hotels").get(getAdminHotelsHandler).post(createAdminHotelHandler);
router.route("/users").get(getAdminUsersHandler);
router
  .route("/hotels/:id")
  .put(updateAdminHotelHandler)
  .delete(deleteAdminHotelHandler);

export default router;

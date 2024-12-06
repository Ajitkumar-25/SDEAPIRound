const express = require("express");
const { bookSeatController } = require("../controllers/userController");
const { verifyToken } = require("../middlewares/authMiddleware");
const { getBookingsController } = require("../controllers/userController");
const {
  getSeatAvailabilityController,
} = require("../controllers/userController");

const router = express.Router();

router.post("/book", verifyToken, bookSeatController);
router.get("/bookings", verifyToken, getBookingsController);
router.get("/seats", verifyToken, getSeatAvailabilityController);

module.exports = router;

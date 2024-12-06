const { bookSeat } = require("../models/bookingModel");
const { getUserBookings } = require("../models/bookingModel");
const { getTrainsByRoute } = require("../models/trainModel");

const bookSeatController = async (req, res) => {
  const { trainId } = req.body;
  const userId = req.userId;
  console.log(trainId, userId);

  try {
    const result = await bookSeat(trainId, userId);
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getBookingsController = async (req, res) => {
  const userId = req.userId;

  try {
    const bookings = await getUserBookings(userId);

    if (bookings.length === 0) {
      return res.status(404).json({ message: "No bookings found!" });
    }
    res.status(200).json(bookings);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getSeatAvailabilityController = async (req, res) => {
  const { source, destination } = req.query;
  if (!source || !destination) {
    return res
      .status(400)
      .json({ message: "Source and destination are required" });
  }

  try {
    const trains = await getTrainsByRoute(source, destination);
    if (trains.length === 0) {
      return res
        .status(404)
        .json({ message: "No trains found for this route" });
    }
    res.status(200).json(trains);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  bookSeatController,
  getBookingsController,
  getSeatAvailabilityController,
};

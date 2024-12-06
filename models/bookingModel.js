const db = require("../config/db");

const bookSeat = async (trainId, userId) => {
  const connection = await db.getConnection();
  await connection.beginTransaction();

  try {
    const [train] = await connection.execute(
      "SELECT availableSeats FROM trains WHERE id = ? FOR UPDATE",
      [trainId]
    );

    if (train[0].availableSeats <= 0) {
      throw new Error("No seats available");
    }

    await connection.execute(
      "UPDATE trains SET availableSeats = availableSeats - 1 WHERE id = ?",
      [trainId]
    );

    await connection.execute(
      "INSERT INTO bookings (trainId, userId) VALUES (?, ?)",
      [trainId, userId]
    );

    await connection.commit();
    return { message: "Seat booked successfully!" };
  } catch (error) {
    await connection.rollback();
    throw error;
  } finally {
    connection.release();
  }
};

const getUserBookings = async (userId) => {
  const [bookings] = await db.execute(
    "SELECT b.id, b.trainId, b.userId, b.bookingTime, t.name as trainName, t.source, t.destination " +
      "FROM bookings b " +
      "JOIN trains t ON b.trainId = t.id " +
      "WHERE b.userId = ?",
    [userId]
  );

  return bookings;
};

module.exports = { bookSeat, getUserBookings };

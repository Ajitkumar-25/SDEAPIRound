const db = require("../config/db");

const addTrain = async (name, source, destination, totalSeats) => {
  const [result] = await db.execute(
    "INSERT INTO trains (name, source, destination, totalSeats, availableSeats) VALUES (?, ?, ?, ?, ?)",
    [name, source, destination, totalSeats, totalSeats]
  );
  return result;
};

const getTrainsByRoute = async (source, destination) => {
 
  const sourceTrimmed = source.trim();
  const destinationTrimmed = destination.trim();

  console.log(
    `Executing query with Source: ${sourceTrimmed}, Destination: ${destinationTrimmed}`
  );

  const [trains] = await db.execute(
    "SELECT id, name, source, destination, availableSeats FROM trains WHERE source = ? AND destination = ? COLLATE utf8_general_ci",
    [sourceTrimmed, destinationTrimmed]
  );

  console.log(trains);

  return trains;
};

module.exports = { addTrain, getTrainsByRoute };

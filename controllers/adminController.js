const { addTrain } = require('../models/trainModel');

const addTrainController = async (req, res) => {
  const { name, source, destination, totalSeats } = req.body;

  try {
    await addTrain(name, source, destination, totalSeats);
    res.status(201).json({ message: 'Train added successfully!' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { addTrainController };

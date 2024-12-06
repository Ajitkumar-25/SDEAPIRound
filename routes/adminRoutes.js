const express = require('express');
const { addTrainController } = require('../controllers/adminController');
const { verifyApiKey } = require('../middlewares/apiKeyMiddleware');

const router = express.Router();
router.post('/trains', verifyApiKey, addTrainController);

module.exports = router;

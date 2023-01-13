const express = require('express');

const router = express.Router();

const reportController = require('../controllers/report');

router.get('/get-report', reportController.getReports);

router.get('/get-latest-report', reportController.getLatestReports);


module.exports = router;

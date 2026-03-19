const express = require('express');
const router = express.Router();
const { submitSurvey, getSurveyResults } = require('../controllers/survey.controller');

// Public — submit survey
router.post('/', submitSurvey);

// Public — view results (for admin dashboard)
router.get('/results', getSurveyResults);

module.exports = router;

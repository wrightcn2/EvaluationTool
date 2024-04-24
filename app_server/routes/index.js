const express = require('express');
const router = express.Router();
const ctrlEvaluations = require('../controllers/evaluations');
const ctrlOthers = require('../controllers/others')

/* GET home page. */
router.get('/', ctrlEvaluations.homelist);
router.get('/evaluation', ctrlEvaluations.evaluationInfo);
router.get('/evaluation/comment/new', ctrlEvaluations.addComment);

router.get('/about', ctrlOthers.about);
router.get('/help', ctrlOthers.help);

module.exports = router;

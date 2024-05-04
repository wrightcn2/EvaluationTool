const express = require('express');
const router = express.Router();
const ctrlEvaluations = require('../controllers/evaluations');
const ctrlOthers = require('../controllers/others')

/* GET home page. */
router.get('/', ctrlEvaluations.homelist);
router.get('/evaluation', ctrlEvaluations.evaluationInfo);
router.get('/evaluation/comment/new', ctrlEvaluations.addComment);
router.get('/evaluation/demographics/new', ctrlEvaluations.projectDemographics);

router.get('/evaluation/content/new', ctrlEvaluations.projectContent);
router.get('/evaluation/content/info', ctrlEvaluations.projectContentInfo);

router.get('/evaluation/skills/new', ctrlEvaluations.verbalSkills);
router.get('/evaluation/skills/info', ctrlEvaluations.verbalSkillsInfo);

router.get('/evaluation/nonverbal/new', ctrlEvaluations.nonverbalSkills);
router.get('/evaluation/nonverbal/info', ctrlEvaluations.nonverbalSkillsInfo);


router.get('/about', ctrlOthers.about);
router.get('/help', ctrlOthers.help);

module.exports = router;

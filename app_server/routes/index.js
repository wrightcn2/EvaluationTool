const express = require('express');
const router = express.Router();
const ctrlEvaluations = require('../controllers/evaluations');
const ctrlOthers = require('../controllers/others')

/* GET home page. */
router.get('/', ctrlEvaluations.homelist);
router.get('/evaluation/:evaluationid', ctrlEvaluations.evaluationInfo);
router.get('/evaluation/:evaluationid/comment/new', ctrlEvaluations.addComment);
router.get('/evaluation/:evaluationid/demographics/new', ctrlEvaluations.projectDemographics);

router.get('/evaluation/:evaluationid/content/new', ctrlEvaluations.projectContent);
router.get('/evaluation/:evaluationid/content/info', ctrlEvaluations.projectContentInfo);

router.get('/evaluation/:evaluationid/skills/new', ctrlEvaluations.verbalSkills);
router.get('/evaluation/:evaluationid/skills/info', ctrlEvaluations.verbalSkillsInfo);

router.get('/evaluation/:evaluationid/nonverbal/new', ctrlEvaluations.nonverbalSkills);
router.get('/evaluation/:evaluationid/nonverbal/info', ctrlEvaluations.nonverbalSkillsInfo);


router.get('/about', ctrlOthers.about);
router.get('/help', ctrlOthers.help);

module.exports = router;

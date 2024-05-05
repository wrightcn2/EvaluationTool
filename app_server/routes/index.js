const express = require('express');
const router = express.Router();
const ctrlEvaluations = require('../controllers/evaluations');
const ctrlOthers = require('../controllers/others');

/* GET home page. */
router.get('/',ctrlEvaluations.getHomelist)
router
    .route('/evaluation/new')
    .get(ctrlEvaluations.addEvaluation)
    .post(ctrlEvaluations.doAddEvaluation);   

router.get('/evaluation/:evaluationid', ctrlEvaluations.evaluationInfo);
router
    .route('/evaluation/:evaluationid/comment/new')
    .get(ctrlEvaluations.addComment)
    .post(ctrlEvaluations.doAddComment);   
                
router
    .route('/evaluation/:evaluationid/demographics/new')
    .get(ctrlEvaluations.addDemographics)
    .post(ctrlEvaluations.doAddDemographics);   

router
    .route('/evaluation/:evaluationid/content/new')
    .get(ctrlEvaluations.addContent)
    .post(ctrlEvaluations.doAddContent);   
router.get('/evaluation/content/info', ctrlEvaluations.projectContentInfo);

router
    .route('/evaluation/:evaluationid/skills/new')
    .get(ctrlEvaluations.addSkills)
    .post(ctrlEvaluations.doAddSkills);   
router.get('/evaluation/skills/info', ctrlEvaluations.verbalSkillsInfo);

router
    .route('/evaluation/:evaluationid/nonverbal/new')
    .get(ctrlEvaluations.addNonverbal)
    .post(ctrlEvaluations.doAddNonverbal);   
router.get('/evaluation/nonverbal/info', ctrlEvaluations.nonverbalSkillsInfo);


router.get('/about', ctrlOthers.about);
router.get('/help', ctrlOthers.help);

module.exports = router;

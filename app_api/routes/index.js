const express = require('express');
const router = express.Router();
const ctrlEvaluations = require('../controllers/evaluations');   
const ctrlDemographics = require('../controllers/demographics');
const ctrlContent = require('../controllers/content');
const ctrlSkills = require('../controllers/skills');
const ctrlNonverbal = require('../controllers/nonverbal'); 
const ctrlComments = require('../controllers/comments');        

// evaluations
router                                                        
  .route('/evaluations')                                        
  .post(ctrlEvaluations.evaluationsCreate);                       
router                                                        
  .route('/evaluations/:evaluationid')                            
  .get(ctrlEvaluations.evaluationsReadOne)                        
  .put(ctrlEvaluations.evaluationsUpdateOne)                      
  .delete(ctrlEvaluations.evaluationsDeleteOne);                  

//demographics comments
router                                                        
  .route('/evaluations/:evaluationid/demographics')                    
  .post(ctrlDemographics.demographicsCreate);                           
router                                                        
  .route('/evaluations/:evaluationid/demographics/:demographicsid')          
  .get(ctrlDemographics.demographicsReadOne)                            
  .put(ctrlDemographics.demographicsUpdateOne)                          
  .delete(ctrlDemographics.demographicsDeleteOne); 
                     
//content comments
router                                                        
  .route('/evaluations/:evaluationid/content')                    
  .post(ctrlContent.contentCreate);                           
router                                                        
  .route('/evaluations/:evaluationid/content/:contentid')          
  .get(ctrlContent.contentReadOne)                            
  .put(ctrlContent.contentUpdateOne)                          
  .delete(ctrlContent.contentDeleteOne); 

//verbal comments
router                                                        
  .route('/evaluations/:evaluationid/skills')                    
  .post(ctrlSkills.skillsCreate);                           
router                                                        
  .route('/evaluations/:evaluationid/skills/:skillsid')          
  .get(ctrlSkills.skillsReadOne)                            
  .put(ctrlSkills.skillsUpdateOne)                          
  .delete(ctrlSkills.skillsDeleteOne); 

//nonverbal comments
router                                                        
  .route('/evaluations/:evaluationid/nonverbal')                    
  .post(ctrlNonverbal.nonverbalCreate);                           
router                                                        
  .route('/evaluations/:evaluationid/nonverbal/:nonverbalid')          
  .get(ctrlNonverbal.nonverbalReadOne)                            
  .put(ctrlNonverbal.nonverbalUpdateOne)                          
  .delete(ctrlNonverbal.nonverbalDeleteOne); 

// overall comments
router                                                        
  .route('/evaluations/:evaluationid/comments')                    
  .post(ctrlComments.commentsCreate);                           
router                                                        
  .route('/evaluations/:evaluationid/comments/:commentid')          
  .get(ctrlComments.commentsReadOne)                            
  .put(ctrlComments.commentsUpdateOne)                          
  .delete(ctrlComments.commentsDeleteOne);                      

module.exports = router;
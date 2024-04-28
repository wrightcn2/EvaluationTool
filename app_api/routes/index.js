const express = require('express');
const router = express.Router();
const ctrlEvaluations = require('../controllers/evaluations');    
const ctrlComments = require('../controllers/comments');        

// evaluations
router                                                        
  .route('/evaluations')                                        
  .get(ctrlEvaluations.evaluationsList)                 
  .post(ctrlEvaluations.evaluationsCreate);                       
router                                                        
  .route('/evaluations/:evaluationid')                            
  .get(ctrlEvaluations.evaluationsReadOne)                        
  .put(ctrlEvaluations.evaluationsUpdateOne)                      
  .delete(ctrlEvaluations.evaluationsDeleteOne);                  

// comments
router                                                        
  .route('/evaluations/:evaluationid/comments')                    
  .post(ctrlComments.commentsCreate);                           
router                                                        
  .route('/evaluations/:evaluationid/comments/:commentid')          
  .get(ctrlComments.commentsReadOne)                            
  .put(ctrlComments.commentsUpdateOne)                          
  .delete(ctrlComments.commentsDeleteOne);                      

module.exports = router;
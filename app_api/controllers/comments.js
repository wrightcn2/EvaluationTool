const mongoose = require('mongoose');
const Eval = mongoose.model('Evaluation');

const commentsCreate = (req, res) => {
    res
    .status(200)
    .json({"status" : "success"});
};
const commentsReadOne = (req, res) => {
    Eval
      .findById(req.params.evaluationid)
      .select('name comments')                                                        

      .exec((err, evaluation) => {
        if (!evaluation) {
          return res
            .status(404)
            .json({
              "message": "evaluation not found"
            });
        } else if (err) {
          return res
            .status(400)
            .json(err);
        }
        if (evaluation.comments && evaluation.comments.length > 0) {                          

          const comment = evaluation.comments.id(req.params.commentid);                      
          if (!comment) {                                                                
            return res                                                                  
              .status(400)                                                              
              .json({                                                                   
                "message": "comment not found"                                           
            });                                                                         
          } else {                                                                      
            response = {                                                                
              evaluation : {                                                              
                name : evaluation.name,                                                   
                id : req.params.evaluationid                                              
              },                                                                        
              comment                                                                    
            };                                                                          
            return res                                                                  
              .status(200)                                                              
              .json(response);                                                          
          }                                                                             
        } else {                                                                        
          return res                                                                    
            .status(404)                                                                
            .json({                                                                    
              "message": "No comments found"                                             
          });                                                                           
        }                                                                               
      }
    );
};
const commentsUpdateOne = (req, res) => {
    res
    .status(200)
    .json({"status" : "success"});
};
const commentsDeleteOne = (req, res) => {
    res
    .status(200)
    .json({"status" : "success"});
};

module.exports = {
    commentsCreate,
    commentsReadOne,
    commentsUpdateOne,
    commentsDeleteOne
  };
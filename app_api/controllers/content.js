const mongoose = require('mongoose');
const Eval = mongoose.model('Evaluation');

const contentCreate = (req, res) => {
    res
    .status(200)
    .json({"status" : "success"});
};
const contentReadOne = (req, res) => {
    Eval
      .findById(req.params.evaluationid)
      .select('name content')                                                        

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
        if (evaluation.content && evaluation.content.length > 0) {                          

          const content = evaluation.content.id(req.params.contentid);                      
          if (!content) {                                                                
            return res                                                                  
              .status(400)                                                              
              .json({                                                                   
                "message": "content not found"                                           
            });                                                                         
          } else {                                                                      
            response = {                                                                
              evaluation : {                                                              
                name : evaluation.name,                                                   
                id : req.params.evaluationid                                              
              },                                                                        
              content                                                                    
            };                                                                          
            return res                                                                  
              .status(200)                                                              
              .json(response);                                                          
          }                                                                             
        } else {                                                                        
          return res                                                                    
            .status(404)                                                                
            .json({                                                                    
              "message": "No content found"                                             
          });                                                                           
        }                                                                               
      }
    );
};
const contentUpdateOne = (req, res) => {
    res
    .status(200)
    .json({"status" : "success"});
};
const contentDeleteOne = (req, res) => {
    res
    .status(200)
    .json({"status" : "success"});
};

module.exports = {
    contentCreate,
    contentReadOne,
    contentUpdateOne,
    contentDeleteOne
  };
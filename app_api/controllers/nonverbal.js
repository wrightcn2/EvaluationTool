const mongoose = require('mongoose');
const Eval = mongoose.model('Evaluation');

const nonverbalCreate= (req, res) => {
    res
    .status(200)
    .json({"status" : "success"});
};
const nonverbalReadOne = (req, res) => {
    Eval
      .findById(req.params.evaluationid)
      .select('name nonverbal')                                                        

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
        if (evaluation.nonverbal && evaluation.nonverbal.length > 0) {                          

          const nonverbal = evaluation.nonverbal.id(req.params.nonverbalid);                      
          if (!nonverbal) {                                                                
            return res                                                                  
              .status(400)                                                              
              .json({                                                                   
                "message": "nonverbal not found"                                           
            });                                                                         
          } else {                                                                      
            response = {                                                                
              evaluation : {                                                              
                name : evaluation.name,                                                   
                id : req.params.evaluationid                                              
              },                                                                        
              nonverbal                                                                    
            };                                                                          
            return res                                                                  
              .status(200)                                                              
              .json(response);                                                          
          }                                                                             
        } else {                                                                        
          return res                                                                    
            .status(404)                                                                
            .json({                                                                    
              "message": "No nonverbal found"                                             
          });                                                                           
        }                                                                               
      }
    );
};
const nonverbalUpdateOne = (req, res) => {
    res
    .status(200)
    .json({"status" : "success"});
};
const nonverbalDeleteOne = (req, res) => {
    res
    .status(200)
    .json({"status" : "success"});
};

module.exports = {
    nonverbalCreate,
    nonverbalReadOne,
    nonverbalUpdateOne,
    nonverbalDeleteOne
  };
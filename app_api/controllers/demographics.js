const mongoose = require('mongoose');
const Eval = mongoose.model('Evaluation');

const demographicsCreate = (req, res) => {
    res
    .status(200)
    .json({"status" : "success"});
};
const demographicsReadOne = (req, res) => {
    Eval
      .findById(req.params.evaluationid)
      .select('name demographics')                                                        

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
        if (evaluation.demographics && evaluation.demographics.length > 0) {                          

          const demographics = evaluation.demographics.id(req.params.demographicsid);                      
          if (!demographics) {                                                                
            return res                                                                  
              .status(400)                                                              
              .json({                                                                   
                "message": "demographics not found"                                           
            });                                                                         
          } else {                                                                      
            response = {                                                                
              evaluation : {                                                              
                name : evaluation.name,                                                   
                id : req.params.evaluationid                                              
              },                                                                        
              demographics                                                                    
            };                                                                          
            return res                                                                  
              .status(200)                                                              
              .json(response);                                                          
          }                                                                             
        } else {                                                                        
          return res                                                                    
            .status(404)                                                                
            .json({                                                                    
              "message": "No demographics found"                                             
          });                                                                           
        }                                                                               
      }
    );
};
const demographicsUpdateOne = (req, res) => {
    res
    .status(200)
    .json({"status" : "success"});
};
const demographicsDeleteOne = (req, res) => {
    res
    .status(200)
    .json({"status" : "success"});
};

module.exports = {
    demographicsCreate,
    demographicsReadOne,
    demographicsUpdateOne,
    demographicsDeleteOne
  };
const mongoose = require('mongoose');
const Eval = mongoose.model('Evaluation');

const skillsCreate = (req, res) => {
    res
    .status(200)
    .json({"status" : "success"});
};
const skillsReadOne = (req, res) => {
    Eval
      .findById(req.params.evaluationid)
      .select('name skills')                                                        

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
        if (evaluation.skills && evaluation.skills.length > 0) {                          

          const skills = evaluation.skills.id(req.params.skillsid);                      
          if (!skills) {                                                                
            return res                                                                  
              .status(400)                                                              
              .json({                                                                   
                "message": "skills not found"                                           
            });                                                                         
          } else {                                                                      
            response = {                                                                
              evaluation : {                                                              
                name : evaluation.name,                                                   
                id : req.params.evaluationid                                              
              },                                                                        
              skills                                                                    
            };                                                                          
            return res                                                                  
              .status(200)                                                              
              .json(response);                                                          
          }                                                                             
        } else {                                                                        
          return res                                                                    
            .status(404)                                                                
            .json({                                                                    
              "message": "No skills found"                                             
          });                                                                           
        }                                                                               
      }
    );
};
const skillsUpdateOne = (req, res) => {
    res
    .status(200)
    .json({"status" : "success"});
};
const skillsDeleteOne = (req, res) => {
    res
    .status(200)
    .json({"status" : "success"});
};

module.exports = {
    skillsCreate,
    skillsReadOne,
    skillsUpdateOne,
    skillsDeleteOne
  };
const mongoose = require('mongoose');
const Eval = mongoose.model('Evaluation');

const evaluationsCreate = (req, res) => {
    res
    .status(200)
    .json({"status" : "success"});
};
const evaluationsReadOne = (req, res) => {
    Eval
      .findById(req.params.evaluationid)
      .exec((err, evaluation) => {
        if (!evaluation) {                           
          return res                               
            .status(404)                           
            .json({                                
              "message": "evaluation not found"      
            });                                    
        } else if (err) {                          
          return res                               
            .status(404)                           
            .json(err);                            
        }
        res                                        
          .status(200)                             
          .json(evaluation);                         
       });
};
const evaluationsUpdateOne = (req, res) => {
    res
    .status(200)
    .json({"status" : "success"});
};
const evaluationsDeleteOne = (req, res) => {
    res
    .status(200)
    .json({"status" : "success"});
};

module.exports = {
    evaluationsCreate,
    evaluationsReadOne,
    evaluationsUpdateOne,
    evaluationsDeleteOne
};
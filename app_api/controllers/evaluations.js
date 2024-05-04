const mongoose = require('mongoose');
const Eval = mongoose.model('Evaluation');

const evaluationsList = async (req, res) => { 
  try {
    const evaluations = await Eval.find({}).select('_id title names rating characteristics').limit(10);
    
    res
      .status(200)
      .json(evaluations);
  } catch (err) {
    res
      .status(404)
      .json(err);
  }
      
};

const evaluationsCreate = (req, res) => {
    Eval.create({
        title: req.body.title,
        names: req.body.names,
        characteristics: req.body.characteristics.split(","),  
      },
      (err, evaluation) => {
        if (err) {
          res
            .status(400)
            .json(err);
        } else {
          res
            .status(201)
            .json(evaluation);
        }
      });
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
  if (!req.params.evaluationid) {
    return res
      .status(404)
      .json({
        "message": "Not found, evaluationid is required"
      });
  }
  Eval 
    .findById(req.params.evaluationid)                          
    .select('-comments -rating -demographics -content -skills -nonverbal')
    .exec((err, evaluation) => {
      if (!evaluation) {
        return res
          .json(404)
          .status({
            "message": "evaluationid not found"
          });
      } else if (err) {
        return res
          .status(400)
          .json(err);
      }
      evaluation.title = req.body.title;                            
      evaluation.names = req.body.names;                      
      evaluation.characteristics = req.body.characteristics.split(',');
      evaluation.save((err, eval) => {                             
        if (err) {
          res                                                   
            .status(404)
            .json(err);
        } else {
          res                                                   
            .status(200)
            .json(eval);
        }
      });
    }
  );
};
const evaluationsDeleteOne = (req, res) => {
  const {evaluationid} = req.params;
  if (evaluationid) {
    Eval
      .findByIdAndRemove(evaluationid)          
      .exec((err, evaluation) =>  {             
          if (err) {
            return res                        
              .status(404)
              .json(err);
          }
          res                                 
            .status(204)
            .json(null);
        }
    );
  } else {
    res
      .status(404)
      .json({
        "message": "No Evaluation"
      });
  }
};

module.exports = {
    evaluationsList,
    evaluationsCreate,
    evaluationsReadOne,
    evaluationsUpdateOne,
    evaluationsDeleteOne
};
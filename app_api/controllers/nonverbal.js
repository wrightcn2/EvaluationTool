const mongoose = require('mongoose');
const Eval = mongoose.model('Evaluation');

const doSetAverageRating_Nonverbal = (evaluation) => {                        
  if (evaluation.nonverbal && evaluation.nonverbal.length > 0) {
    const count = evaluation.nonverbal.length;
    const total = evaluation.nonverbal.reduce((acc, {eyeContact, gestures}) => {    
      return acc + eyeContact + gestures;
    }, 0);
    const rating = parseInt(total / count).toFixed(2);
    evaluation.rating = rating;              
    evaluation.save(err => {                                        
      if (err) {
        console.log(err);
      } else {
        console.log(`Average rating updated to ${evaluation.rating}`);
       }
     });
  }
};
const updateAverageRating_Nonverbal = (evaluationId) => {                     
  Eval.findById(evaluationId)
    .select('rating nonverbal')
    .exec((err, evaluation) => {
      if (!err) {
        doSetAverageRating_Nonverbal(evaluation);
       }
     });
};

const doAddNonverbal = (req, res, evaluation) => {                    
  if (!evaluation) {
    res
      .status(404)
      .json({"message": "Evaluation not found"});
  } else {
    const {eyeContact, gestures} = req.body;
    evaluation.nonverbal.push({                                      
      eyeContact,
      gestures
    });
    evaluation.save((err, evaluation) => {                           
      if (err) {
        res
          .status(400)
          .json(err);
      } else {
        updateAverageRating_Nonverbal(evaluation._id);                       
        const thisNonverbal = evaluation.nonverbal.slice(-1).pop();     
        res                                                      
          .status(201)
          .json(thisNonverbal);
       }
     });
  }
};

const nonverbalCreate = (req, res) => {
  const evaluationId = req.params.evaluationid;
  if (evaluationId) {
    Eval
      .findById(evaluationId)
      .select('nonverbal')
      .exec((err, evaluation) => {
        if (err) {
          res
            .status(400)
            .json(err);
        } else {
          doAddNonverbal(req, res, evaluation);        
         }
       });
  } else {
    res
      .status(404)
      .json({"message": "Evaluation not found"});
  }
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
  if (!req.params.evaluationid || !req.params.nonverbalid) {
    return res
      .status(404)
      .json({
        "message": "Not found, evaluationid and nonverbalid are both required"
      });
  }
  Eval
    .findById(req.params.evaluationid)                                    
    .select('nonverbal')
    .exec((err, evaluation) => {
      if (!evaluation) {
        return res
          .status(404)
          .json({
            "message": "Evaluation not found"
           });
      } else if (err) {
        return res
          .status(400)
          .json(err);
      }
      if (evaluation.nonverbal && evaluation.nonverbal.length > 0) {
        const thisNonverbal = evaluation.nonverbal.id(req.params.nonverbalid);    
        if (!thisNonverbal) {
          res
            .status(404)
            .json({
              "message": "Nonverbal not found"
            });
        } else {
          thisNonverbal.eyeContact = req.body.eyeContact;                          
          thisNonverbal.gestures = req.body.gestures;                          

          evaluation.save((err, evaluation) => {                            
            if (err) {
              res                                                       
                .status(404)
                .json(err);
            } else {
              updateAverageRating_Nonverbal(evaluation._id);
              res                                                       
                .status(200)
                .json(thisNonverbal);
            }
          });
        }
      } else {
        res
          .status(404)
          .json({
            "message": "No nonverbal to update"
          });
      }
    }
  );
};
const nonverbalDeleteOne = (req, res) => {
  const {evaluationid, nonverbalid} = req.params;
  if (!evaluationid || !nonverbalid) {
    return res
      .status(404)
      .json({'message': 'Not found, evaluationid and nonverbalid are both required'});
  }
  Eval
    .findById(evaluationid)
    .select('nonverbal')
    .exec((err, evaluation) => {
      if (!evaluation) {
        return res
          .status(404)
          .json({'message': 'Evaluation not found'});
      } else if (err) {
        return res
          .status(400)
          .json(err);
      }

      if (evaluation.nonverbal && evaluation.nonverbal.length > 0) {
        if (!evaluation.nonverbal.id(nonverbalid)) {
          return res
            .status(404)
            .json({'message': 'Nonverbal not found'});
        } else {
          evaluation.nonverbal.id(nonverbalid).remove();
          evaluation.save(err => {
            if (err) {
              return res
                .status(404)
                .json(err);
            } else {
              updateAverageRating_Nonverbal(evaluation._id);
              res
                .status(204)
                .json(null);
            }
          });
        }
      } else {
        res
          .status(404)
          .json({'message': 'No Nonverbal to delete'});
      }
    });
};

module.exports = {
    nonverbalCreate,
    nonverbalReadOne,
    nonverbalUpdateOne,
    nonverbalDeleteOne
  };
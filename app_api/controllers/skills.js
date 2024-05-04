const mongoose = require('mongoose');
const Eval = mongoose.model('Evaluation');

const doSetAverageRating_Skills = (evaluation) => {                        
  if (evaluation.skills && evaluation.skills.length > 0) {
    const count = evaluation.skills.length;
    const total = evaluation.skills.reduce((acc, {enthusiasm, elocution, vocalPause}) => {    
      return acc + enthusiasm + elocution + vocalPause;
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
const updateAverageRating_Skills = (evaluationId) => {                     
  Eval.findById(evaluationId)
    .select('rating skills')
    .exec((err, evaluation) => {
      if (!err) {
        doSetAverageRating_Skills(evaluation);
       }
     });
};

const doAddSkills = (req, res, evaluation) => {                    
  if (!evaluation) {
    res
      .status(404)
      .json({"message": "Evaluation not found"});
  } else {
    const {enthusiasm, elocution, vocalPause} = req.body;
    evaluation.skills.push({                                      
      enthusiasm,
      elocution,
      vocalPause
    });
    evaluation.save((err, evaluation) => {                           
      if (err) {
        res
          .status(400)
          .json(err);
      } else {
        updateAverageRating_Skills(evaluation._id);                       
        const thisSkills = evaluation.skills.slice(-1).pop();     
        res                                                      
          .status(201)
          .json(thisSkills);
       }
     });
  }
};

const skillsCreate = (req, res) => {
  const evaluationId = req.params.evaluationid;
  if (evaluationId) {
    Eval
      .findById(evaluationId)
      .select('skills')
      .exec((err, evaluation) => {
        if (err) {
          res
            .status(400)
            .json(err);
        } else {
          doAddSkills(req, res, evaluation);        
         }
       });
  } else {
    res
      .status(404)
      .json({"message": "Evaluation not found"});
  }
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
  if (!req.params.evaluationid || !req.params.skillsid) {
    return res
      .status(404)
      .json({
        "message": "Not found, evaluationid and skillsid are both required"
      });
  }
  Eval
    .findById(req.params.evaluationid)                                    
    .select('skills')
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
      if (evaluation.skills && evaluation.skills.length > 0) {
        const thisSkills = evaluation.skills.id(req.params.skillsid);    
        if (!thisSkills) {
          res
            .status(404)
            .json({
              "message": "Skills not found"
            });
        } else {

          thisSkills.enthusiasm = req.body.enthusiasm;                          
          thisSkills.elocution = req.body.elocution;                          
          thisSkills.vocalPause = req.body.vocalPause;  

          evaluation.save((err, evaluation) => {                            
            if (err) {
              res                                                       
                .status(404)
                .json(err);
            } else {
              updateAverageRating_Skills(evaluation._id);
              res                                                       
                .status(200)
                .json(thisSkills);
            }
          });
        }
      } else {
        res
          .status(404)
          .json({
            "message": "No skills to update"
          });
      }
    }
  );
};
const skillsDeleteOne = (req, res) => {
  const {evaluationid, skillsid} = req.params;
  if (!evaluationid || !skillsid) {
    return res
      .status(404)
      .json({'message': 'Not found, evaluationid and skillsid are both required'});
  }

  Eval
    .findById(evaluationid)
    .select('skills')
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

      if (evaluation.skills && evaluation.skills.length > 0) {
        if (!evaluation.skills.id(skillsid)) {
          return res
            .status(404)
            .json({'message': 'Skills not found'});
        } else {
          evaluation.skills.id(skillsid).remove();
          evaluation.save(err => {
            if (err) {
              return res
                .status(404)
                .json(err);
            } else {
              updateAverageRating_Skills(evaluation._id);
              res
                .status(204)
                .json(null);
            }
          });
        }
      } else {
        res
          .status(404)
          .json({'message': 'No Skills to delete'});
      }
    });
};

module.exports = {
    skillsCreate,
    skillsReadOne,
    skillsUpdateOne,
    skillsDeleteOne
  };
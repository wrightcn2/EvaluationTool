const mongoose = require('mongoose');
const Eval = mongoose.model('Evaluation');

const doAddDemographics = (req, res, evaluation) => {                    
  if (!evaluation) {
    res
      .status(404)
      .json({"message": "Evaluation not found"});
  } else {
    const {groupMembers, date, evaluatorName, title_pres} = req.body;
    evaluation.demographics.push({                                      
      groupMembers,
      date,
      evaluatorName,
      title_pres
    });
    evaluation.save((err, evaluation) => {                           
      if (err) {
        res
          .status(400)
          .json(err);
      } else {
        const thisDemographics = evaluation.demographics.slice(-1).pop();     
        res                                                      
          .status(201)
          .json(thisDemographics);
       }
     });
  }
};

const demographicsCreate = (req, res) => {
  const evaluationId = req.params.evaluationid;
  if (evaluationId) {
    Eval
      .findById(evaluationId)
      .select('demographics')
      .exec((err, evaluation) => {
        if (err) {
          res
            .status(400)
            .json(err);
        } else {
          doAddDemographics(req, res, evaluation);        
         }
       });
  } else {
    res
      .status(404)
      .json({"message": "Evaluation not found"});
  }
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
  if (!req.params.evaluationid || !req.params.demographicsid) {
    return res
      .status(404)
      .json({
        "message": "Not found, evaluationid and demographicsid are both required"
      });
  }
  Eval
    .findById(req.params.evaluationid)                                    
    .select('demographics')
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
      if (evaluation.demographics && evaluation.demographics.length > 0) {
        const thisDemographics = evaluation.demographics.id(req.params.demographicsid);    
        if (!thisDemographics) {
          res
            .status(404)
            .json({
              "message": "Demographics not found"
            });
        } else {
          thisDemographics.groupMembers = req.body.groupMembers;                          
          thisDemographics.date = req.body.date;                          
          thisDemographics.evaluatorName = req.body.evaluatorName;
          thisDemographics.title_pres = req.body.title_pres;                 
          evaluation.save((err) => {  //may need to put evaluation back here                           
            if (err) {
              res                                                       
                .status(404)
                .json(err);
            } else {
              res                                                       
                .status(200)
                .json(thisDemographics);
            }
          });
        }
      } else {
        res
          .status(404)
          .json({
            "message": "No demographics to update"
          });
      }
    }
  );
};
const demographicsDeleteOne = (req, res) => {
  const {evaluationid, demographicsid} = req.params;
  if (!evaluationid || !demographicsid) {
    return res
      .status(404)
      .json({'message': 'Not found, evaluationid and demographicsid are both required'});
  }

  Eval
    .findById(demographicsid)
    .select('demographics')
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

      if (evaluation.demographics && evaluation.demographics.length > 0) {
        if (!evaluation.demographics.id(demographicsid)) {
          return res
            .status(404)
            .json({'message': 'Demographics not found'});
        } else {
          evaluation.demographics.id(demographicsid).remove();
          evaluation.save(err => {
            if (err) {
              return res
                .status(404)
                .json(err);
            } else {
              res
                .status(204)
                .json(null);
            }
          });
        }
      } else {
        res
          .status(404)
          .json({'message': 'No Comment to delete'});
      }
    });
};

module.exports = {
    demographicsCreate,
    demographicsReadOne,
    demographicsUpdateOne,
    demographicsDeleteOne
  };
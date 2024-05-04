const mongoose = require('mongoose');
const Eval = mongoose.model('Evaluation');

const doSetAverageRating_Content = (evaluation) => {                        
  if (evaluation.content && evaluation.content.length > 0) {
    const count = evaluation.content.length;
    const total = evaluation.content.reduce((acc, {introduction, organization, timeFrame, visualAid, preparation}) => {    
      return acc + introduction + organization + timeFrame + visualAid + preparation;
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
const updateAverageRating_Content = (evaluationId) => {                     
  Eval.findById(evaluationId)
    .select('rating content')
    .exec((err, evaluation) => {
      if (!err) {
        doSetAverageRating_Content(evaluation);
       }
     });
};

const doAddContent = (req, res, evaluation) => {                    
  if (!evaluation) {
    res
      .status(404)
      .json({"message": "Evaluation not found"});
  } else {
    const {introduction, organization, timeFrame, visualAid, preparation} = req.body;
    evaluation.content.push({                                      
      introduction,
      organization,
      timeFrame,
      visualAid,
      preparation
    });
    evaluation.save((err, evaluation) => {                           
      if (err) {
        res
          .status(400)
          .json(err);
      } else {
        updateAverageRating_Content(evaluation._id);                       
        const thisContent = evaluation.content.slice(-1).pop();     
        res                                                      
          .status(201)
          .json(thisContent);
       }
     });
  }
};

const contentCreate = (req, res) => {
  const evaluationId = req.params.evaluationid;
  if (evaluationId) {
    Eval
      .findById(evaluationId)
      .select('content')
      .exec((err, evaluation) => {
        if (err) {
          res
            .status(400)
            .json(err);
        } else {
          doAddContent(req, res, evaluation);        
         }
       });
  } else {
    res
      .status(404)
      .json({"message": "Evaluation not found"});
  }
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
  if (!req.params.evaluationid || !req.params.contentid) {
    return res
      .status(404)
      .json({
        "message": "Not found, evaluationid and contentid are both required"
      });
  }
  Eval
    .findById(req.params.evaluationid)                                    
    .select('content')
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
      if (evaluation.content && evaluation.content.length > 0) {
        const thisContent = evaluation.content.id(req.params.contentid);    
        if (!thisContent) {
          res
            .status(404)
            .json({
              "message": "Content not found"
            });
        } else {

          thisContent.introduction = req.body.introduction;                          
          thisContent.organization = req.body.organization;                          
          thisContent.timeFrame = req.body.timeFrame;  
          thisContent.visualAid = req.body.visualAid;  
          thisContent.preparation = req.body.preparation;  

          evaluation.save((err, evaluation) => {                            
            if (err) {
              res                                                       
                .status(404)
                .json(err);
            } else {
              updateAverageRating_Content(evaluation._id);
              res                                                       
                .status(200)
                .json(thisContent);
            }
          });
        }
      } else {
        res
          .status(404)
          .json({
            "message": "No content to update"
          });
      }
    }
  );
};
const contentDeleteOne = (req, res) => {
  const {evaluationid, contentid} = req.params;
  if (!evaluationid || !contentid) {
    return res
      .status(404)
      .json({'message': 'Not found, evaluationid and contentid are both required'});
  }

  Eval
    .findById(evaluationid)
    .select('content')
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

      if (evaluation.console && evaluation.content.length > 0) {
        if (!evaluation.content.id(contentid)) {
          return res
            .status(404)
            .json({'message': 'Content not found'});
        } else {
          evaluation.content.id(contentid).remove();
          evaluation.save(err => {
            if (err) {
              return res
                .status(404)
                .json(err);
            } else {
              updateAverageRating_Content(evaluation._id);
              res
                .status(204)
                .json(null);
            }
          });
        }
      } else {
        res
          .status(404)
          .json({'message': 'No Content to delete'});
      }
    });
};

module.exports = {
    contentCreate,
    contentReadOne,
    contentUpdateOne,
    contentDeleteOne
  };
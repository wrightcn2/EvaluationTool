const mongoose = require('mongoose');
const Eval = mongoose.model('Evaluation');

const doSetAverageRating = (evaluation) => {                        
  if (evaluation.comments && evaluation.comments.length > 0) {
    const count = evaluation.comments.length;
    const total = evaluation.comments.reduce((acc, {rating}) => {    
      return acc + rating;
    }, 0);
    evaluation.rating = parseInt(total / count, 10);                
    evaluation.save(err => {                                        
      if (err) {
        console.log(err);
      } else {
        console.log(`Average rating updated to ${evaluation.rating}`);
       }
     });
  }
};
const updateAverageRating = (evaluationId) => {                     
  Eval.findById(evaluationId)
    .select('rating comments')
    .exec((err, evaluation) => {
      if (!err) {
        doSetAverageRating(evaluation);
       }
     });
};

const doAddComment = (req, res, evaluation) => {                    
  if (!evaluation) {
    res
      .status(404)
      .json({"message": "Evaluation not found"});
  } else {
    const {author, rating, commentText} = req.body;
    evaluation.comments.push({                                      
      author,
      rating,
      commentText
    });
    evaluation.save((err, evaluation) => {                           
      if (err) {
        res
          .status(400)
          .json(err);
      } else {
        updateAverageRating(evaluation._id);                       
        const thisComment = evaluation.comments.slice(-1).pop();     
        res                                                      
          .status(201)
          .json(thisComment);
       }
     });
  }
};

const commentsCreate = (req, res) => {
  const evaluationId = req.params.evaluationid;
  if (evaluationId) {
    Eval
      .findById(evaluationId)
      .select('comments')
      .exec((err, evaluation) => {
        if (err) {
          res
            .status(400)
            .json(err);
        } else {
          doAddComment(req, res, evaluation);        
         }
       });
  } else {
    res
      .status(404)
      .json({"message": "Evaluation not found"});
  }
};
const commentsReadOne = (req, res) => {
    Eval
      .findById(req.params.evaluationid)
      .select('name comments')                                                        

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
        if (evaluation.comments && evaluation.comments.length > 0) {                          

          const comment = evaluation.comments.id(req.params.commentid);                      
          if (!comment) {                                                                
            return res                                                                  
              .status(400)                                                              
              .json({                                                                   
                "message": "comment not found"                                           
            });                                                                         
          } else {                                                                      
            response = {                                                                
              evaluation : {                                                              
                name : evaluation.name,                                                   
                id : req.params.evaluationid                                              
              },                                                                        
              comment                                                                    
            };                                                                          
            return res                                                                  
              .status(200)                                                              
              .json(response);                                                          
          }                                                                             
        } else {                                                                        
          return res                                                                    
            .status(404)                                                                
            .json({                                                                    
              "message": "No comments found"                                             
          });                                                                           
        }                                                                               
      }
    );
};
const commentsUpdateOne = (req, res) => {
  if (!req.params.evaluationid || !req.params.commentid) {
    return res
      .status(404)
      .json({
        "message": "Not found, evaluationid and commentid are both required"
      });
  }
  Eval
    .findById(req.params.evaluationid)                                    
    .select('comments')
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
      if (evaluation.comments && evaluation.comments.length > 0) {
        const thisComment = evaluation.comments.id(req.params.commentid);    
        if (!thisComment) {
          res
            .status(404)
            .json({
              "message": "Comment not found"
            });
        } else {

          thisComment.author = req.body.author;                          
          thisComment.rating = req.body.rating;                          
          thisComment.commentText = req.body.commentText;                  
          evaluation.save((err, evaluation) => {                            
            if (err) {
              res                                                       
                .status(404)
                .json(err);
            } else {
              updateAverageRating(evaluation._id);
              res                                                       
                .status(200)
                .json(thisComment);
            }
          });
        }
      } else {
        res
          .status(404)
          .json({
            "message": "No comment to update"
          });
      }
    }
  );
};
const commentsDeleteOne = (req, res) => {
  const {evaluationid, commentid} = req.params;
  if (!evaluationid || !commentid) {
    return res
      .status(404)
      .json({'message': 'Not found, evaluationid and commentid are both required'});
  }

  Eval
    .findById(evaluationid)
    .select('comments')
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

      if (evaluation.comments && evaluation.comments.length > 0) {
        if (!evaluation.comments.id(commentid)) {
          return res
            .status(404)
            .json({'message': 'Comment not found'});
        } else {
          evaluation.comments.id(commentid).remove();
          evaluation.save(err => {
            if (err) {
              return res
                .status(404)
                .json(err);
            } else {
              updateAverageRating(evaluation._id);
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
    commentsCreate,
    commentsReadOne,
    commentsUpdateOne,
    commentsDeleteOne
  };
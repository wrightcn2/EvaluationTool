const request = require('request');
const apiOptions = {
    server: 'http://localhost:3000'
};

const showError = (req, res, status) =>  {
    let title = '';
    let content = '';
    if (status === 404) {                                                   
      title = '404, page not found';                                        
      content = 'Oh dear. Looks like you can\'t find this page. Sorry.';    
    } else {                                                                
      title = `${status}, something's gone wrong`;                          
      content = 'Something, somewhere, has gone just a little bit wrong.';  
    }
    res.status(status);                                                     
    res.render('generic-text', {                                            
      title,                                                                
      content                                                               
    });                                                                     
};

const renderHomepage = (req, res, responseBody) => {
    let message = null;
    if (!(responseBody instanceof Array))
    {
        message = "API lookup error";
        responseBody = [];
    } else {
        if(!responseBody.length){
            message = "No evaluations found";
        }
    }
    res.render('evaluations-list', {
        title: 'Evaluation Tool - evaluate presentations with ease',
        pageHeader: {
            title: 'Evaluation Tool',
            strapline: 'Evaluate projects and presentations with ease!'
        },
        sidebar: "Looking for a way to evaluate something with ease? Evaluation Tool helps you do just that. All digital and easy to use! Let EvaluationTool help you assess the things you're looking for.",
        evaluations: responseBody,
        message
    });
};

const getHomelist = (req, res) => {
    const path = '/api/evaluations';
    const requestOptions = {
        url: `${apiOptions.server}${path}`,
        method: 'GET',
        json: {}
    };
    request(
        requestOptions,
        (err, {statusCode}, body) => {
            let data = [];
            if(statusCode === 200 && body.length)
            {
                data = body.map( (item) => {
                    return item;
                });
            }
            renderHomepage(req, res, body);
        }
    );
};
const doAddEvaluation = (req, res) => {
    const evaluationid = req.params.evaluationid;                 
    const path = `/api/evaluations/`; 
    console.log(req.body);
    const postdata = { 
        title: req.body.title,                                  
        names: req.body.names, 
        characteristics: req.body.characteristics                             
    };                                                        
    const requestOptions = {
        url: `${apiOptions.server}${path}`,                     
        method: 'POST',                                         
        json: postdata                                          
    };
    request(                                                  
        requestOptions,
        (err, {statusCode}, body) => {
            if (statusCode === 201) {                             
                res.redirect(`/`);            
            } else {                                              
                showError(req, res, statusCode);                    
            }
        }
    );
};

const addEvaluation = (req, res) => {
    res.render('evaluation-new', { title: 'Add review' });
};
const renderDetailsPage = (req, res, evaluation) => {
    res.render('evaluation-info',  
    {
        title: evaluation.title,
        pageHeader: {
            title: evaluation.title,
        },
        sidebar: {
            context: 'This MEAN Full Stack Project was a final project for the class CS 5780. They were tasked with create another version of the semester project Loc8r.',
            callToAction: 'If you have any comments or suggestions please leave a comment to help the presenter.'
        },
        evaluation
    });
};
const renderCommentForm = (req, res, {title}) => {
    res.render('evaluation-comment-form', {
        title: `Comment on ${title} with EvaluationTool`,
        pageHeader: { title: `Add Comment to ${title}` },
        error: req.query.err
      });
};
const renderDemographicsForm = (req, res, {title}) => {
    res.render('evaluation-demographics-form', {
        title: `Add Demographics to ${title} with EvaluationTool`,
        pageHeader: { title: `Add Demographics to ${title}` }
      });
};
const renderContentForm = (req, res, {title}) => {
    res.render('evaluation-content-form', {
        title: `Rate Content of ${title} with EvaluationTool`,
        pageHeader: { title: `Add Content Ratings to ${title}` }
      });
};
const renderSkillsForm = (req, res, {title}) => {
    res.render('evaluation-verbalskills-form', {
        title: `Rate Verbal Skills on ${title} with EvaluationTool`,
        pageHeader: { title: `Rate Verbal Skills on ${title}` }
      });
};
const renderNonverbalForm = (req, res, {title}) => {
    res.render('evaluation-nonverbalskills-form', {
        title: `Rate Nonverbal Skills on ${title} with EvaluationTool`,
        pageHeader: { title: `Rate Nonverbal Skills on ${title}` }
      });
};
const getEvaluationInfo = (req, res, callback) => {
    const path = `/api/evaluations/${req.params.evaluationid}`;
    const requestOptions = {
      url: `${apiOptions.server}${path}`,
      method: 'GET',
      json: {}
    };
    request(
      requestOptions,
      (err, {statusCode}, body) => {
        const data = body;
        if(statusCode === 200){
          callback(req, res, data);
        } else {
          showError(req, res, statusCode);
        }
      }
    );
};

const evaluationInfo = (req, res) => {
   getEvaluationInfo(req, res,
    (req, res, responseData) => renderDetailsPage(req, res, responseData)
   );
};

const addComment = (req, res) => {
    getEvaluationInfo(req, res,
    (req, res, responseData) => renderCommentForm(req, res, responseData)
    );
};

const doAddComment = (req, res) => {
    const evaluationid = req.params.evaluationid;                 
    const path = `/api/evaluations/${evaluationid}/comments`; 
    const postdata = { 
        author: req.body.name,                                  
        rating: parseInt(req.body.rating, 10),                  
        commentText: req.body.comment                             
    };                                                        
    const requestOptions = {
        url: `${apiOptions.server}${path}`,                     
        method: 'POST',                                         
        json: postdata                                          
    };
    if (!postdata.author || !postdata.rating || !postdata.commentText) {    
        res.redirect(`/evaluation/${evaluationid}/comment/new?err=val`);          
    } else {  
        request(                                                  
            requestOptions,
            (err, {statusCode}, {name}) => {
                if (statusCode === 201) {                             
                    res.redirect(`/evaluation/${evaluationid}`);            
                } else if( statusCode === 400
                    && name && name === 'ValidationError')
                {   
                    res.redirect(`/evaluation/${evaluationid}/comment/new?err=val`);
                } else {   
                    console.log(body);                                           
                    showError(req, res, statusCode);                    
                }
            }
        );
    }
};

//Project information
const addDemographics = (req, res) => {
    getEvaluationInfo(req, res,
        (req, res, responseData) => renderDemographicsForm(req, res, responseData)
    );
};
const doAddDemographics = (req, res) => {
    const evaluationid = req.params.evaluationid;                 
    const path = `/api/evaluations/${evaluationid}/demographics`; 
    const postdata = { 
        groupMembers: req.body.groupMembers,                                  
        date: req.body.date,                  
        evaluatorName: req.body.evaluatorName,
        title_pres: req.body.title_pres                             
    };                                                        
    const requestOptions = {
        url: `${apiOptions.server}${path}`,                     
        method: 'POST',                                         
        json: postdata                                          
    };
    request(                                                  
        requestOptions,
        (err, {statusCode}, body) => {
            if (statusCode === 201) {                             
                res.redirect(`/evaluation/${evaluationid}`);            
            } else {                                              
                showError(req, res, statusCode);                    
            }
        }
    );
};


const addContent = (req, res) => {
    getEvaluationInfo(req, res,
        (req, res, responseData) => renderContentForm(req, res, responseData)
    );
};
const doAddContent = (req, res) => {
    const evaluationid = req.params.evaluationid;                 
    const path = `/api/evaluations/${evaluationid}/content`; 
    const postdata = { 
        introduction: req.body.introduction,                                  
        organization: req.body.organization,                  
        timeFrame: req.body.timeFrame,
        visualAid: req.body.visualAid,
        preparation: req.body.preparation                             
    };                                                        
    const requestOptions = {
        url: `${apiOptions.server}${path}`,                     
        method: 'POST',                                         
        json: postdata                                          
    };
    request(                                                  
        requestOptions,
        (err, {statusCode}, body) => {
            if (statusCode === 201) {                             
                res.redirect(`/evaluation/${evaluationid}`);            
            } else {                                              
                showError(req, res, statusCode);                    
            }
        }
    );
};
const projectContentInfo = (req, res) => {
    res.render('evaluation-content-form-info', {title: 'Read Content Information'});
};

const addSkills = (req, res) => {
    getEvaluationInfo(req, res,
        (req, res, responseData) => renderSkillsForm(req, res, responseData)
    );
};
const doAddSkills = (req, res) => {
    const evaluationid = req.params.evaluationid;                 
    const path = `/api/evaluations/${evaluationid}/skills`; 
    const postdata = { 
        enthusiasm: req.body.enthusiasm,                                  
        elocution: req.body.elocution,                  
        vocalPause: req.body.vocalPause,
    };                                                        
    const requestOptions = {
        url: `${apiOptions.server}${path}`,                     
        method: 'POST',                                         
        json: postdata                                          
    };
    request(                                                  
        requestOptions,
        (err, {statusCode}, body) => {
            if (statusCode === 201) {                             
                res.redirect(`/evaluation/${evaluationid}`);            
            } else {                                              
                showError(req, res, statusCode);                    
            }
        }
    );
};
const verbalSkillsInfo = (req, res) => {
    res.render('evaluation-verbalskills-form-info', {title: 'Read Verbal Skills Information'});
};

const addNonverbal = (req, res) => {
    getEvaluationInfo(req, res,
        (req, res, responseData) => renderNonverbalForm(req, res, responseData)
    );
};
const doAddNonverbal = (req, res) => {
    const evaluationid = req.params.evaluationid;                 
    const path = `/api/evaluations/${evaluationid}/nonverbal`; 
    const postdata = { 
        eyeContact: req.body.eyeContact,                                  
        gestures: req.body.gestures                 
                                 
    };                                                        
    const requestOptions = {
        url: `${apiOptions.server}${path}`,                     
        method: 'POST',                                         
        json: postdata                                          
    };
    request(                                                  
        requestOptions,
        (err, {statusCode}, body) => {
            if (statusCode === 201) {                             
                res.redirect(`/evaluation/${evaluationid}`);            
            } else {                                              
                showError(req, res, statusCode);                    
            }
        }
    );
};
const nonverbalSkillsInfo = (req, res) => {
    res.render('evaluation-nonverbalskills-form-info', {title: 'Read Non-verbal Skills Information'});
};



module.exports = {
    getHomelist,
    evaluationInfo,
    addEvaluation,
    doAddEvaluation,
    addComment,
    doAddComment,
    addDemographics,
    doAddDemographics,
    addContent,
    doAddContent,
    projectContentInfo,
    addSkills,
    doAddSkills,
    verbalSkillsInfo,
    addNonverbal,
    doAddNonverbal,
    nonverbalSkillsInfo
}
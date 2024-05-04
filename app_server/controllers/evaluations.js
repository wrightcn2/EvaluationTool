const request = require('request');
const apiOptions = {
    server: 'http://localhost:3000'
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

const homelist = (req, res) => {
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

const evaluationInfo = (req, res) => {
    const path = `/api/evaluations/${req.params.evaluationid}`;      
    const requestOptions = {                                     
      url: `${apiOptions.server}${path}`,                        
      method: 'GET',                                             
      json: {}                                                   
    };                                                           
    request(
      requestOptions,
      (err, response, body) => {
        console.log(body);
        renderDetailsPage(req, res, body);                              
      }
    );
};

const addComment = (req, res) => {
    res.render('evaluation-comment-form', {title: 'Add Comment'});
};

//Project information
const projectDemographics = (req, res) => {
    res.render('evaluation-demographics-form', {title: 'Add Project Demographics'});
};

const projectContent = (req, res) => {
    res.render('evaluation-content-form', {title: 'Add Project Content'});
};
const projectContentInfo = (req, res) => {
    res.render('evaluation-content-form-info', {title: 'Read Project Content Information'});
};

const verbalSkills = (req, res) => {
    res.render('evaluation-verbalskills-form', {title: 'Add Verbal Skills'});
};
const verbalSkillsInfo = (req, res) => {
    res.render('evaluation-verbalskills-form-info', {title: 'Read Verbal Skills Information'});
};

const nonverbalSkills = (req, res) => {
    res.render('evaluation-nonverbalskills-form', {title: 'Add Non-verbal Skills'});
};
const nonverbalSkillsInfo = (req, res) => {
    res.render('evaluation-nonverbalskills-form-info', {title: 'Read Non-verbal Skills Information'});
};



module.exports = {
    homelist,
    evaluationInfo,
    addComment,
    projectDemographics,
    projectContent,
    projectContentInfo,
    verbalSkills,
    verbalSkillsInfo,
    nonverbalSkills,
    nonverbalSkillsInfo
}
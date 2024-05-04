const request = require('request');
const apiOptions = {
    server: 'http://localhost:3000'
};

const renderHomepage = (req, res, responseBody) => {
    //console.log("Response is:", responseBody);
    res.render('evaluations-list', {
        title: 'Evaluation Tool - evaluate presentations with ease',
        pageHeader: {
            title: 'Evaluation Tool',
            strapline: 'Evaluate projects and presentations with ease!'
        },
        sidebar: "Looking for a way to evaluate something with ease? Evaluation Tool helps you do just that. All digital and easy to use! Let EvaluationTool help you assess the things you're looking for.",
        evaluations: responseBody
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
        (err, response, body) => {
            renderHomepage(req, res, body);
            console.log("Response is:", req.body);
        }
    );
};

const evaluationInfo = (req, res) => {
    res.render('evaluation-info', 
    {
        title: 'MEAN Full Stack Final Project',
        pageHeader: {
            title: 'Evaluation Tool',
        },
        sidebar: {
            context: 'This MEAN Full Stack Project was a final project for the class CS 5780. They were tasked with create another version of the semester project Loc8r.',
            callToAction: 'If you have any comments or suggestions please leave a comment to help the presenter.'
        },
        evaluations:
        {
            title: 'MEAN Full Stack Final Project',
            names: ['Christiana Wright'],
            rating: 4,
            characteristics: ['Solo Project', 'Computer Science', 'Final'], 
            demographics: [{
                    groupMembers: ['This individual was by themselves.'],
                    date: '4/26/2024',
                    evaluatorName: 'Professor John Snow',
                    title_pres: 'Evaluation Tool: the app'
            }],
            content: [{
                introductionRating: 4,
                organizationRating: 4,
                timeFrameRating: 4,
                visualAidRating: 4,
                preparationRating: 4
            }],
            verbal: [{
                ethusiasmRating: 4,
                elocutionRating: 4,
                vocalPausesRating: 4
            }],
            nonVerbal: [{
                eyeContactRating: 4,
                gesturesRating: 4
            }],
            comments: [{
                author: 'John Smith',
                rating: 4,
                timestamp: '16 April 2024',
                commentText: 'Overall great presentation, a couple issues but nothing horrible.'
            },{
                author: 'Jane Doe',
                rating: 3,
                timestamp: '16 April 2024',
                commentText: 'It was okay. The verbal cues need work, but the content was good.'
            }]
        }
    });
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
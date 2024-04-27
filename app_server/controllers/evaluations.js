const homelist = (req, res) => {
    res.render('evaluations-list', {
        title: 'Evaluation Tool - evaluate presentations with ease',
        pageHeader: {
            title: 'Evaluation Tool',
            strapline: 'Evaluate projects and presentations with ease!'
        },
        evaluations:[{
            title: 'MEAN Full Stack Final Project',
            names: ['Christiana Wright'],
            rating: 4,
            characteristics: ['Solo Project', 'Computer Science', 'Final'],
        },{
            title: 'MEAN Full Statck Final Project',
            names: ['Simon Holmes', 'Clive Harber'],
            rating: 3,
            characteristics: ['Group Project', 'COmputer Science', 'Final Semester Project'],

        }, {
            title: 'Senior Seminar Final Presentation',
            names: 'Grace Wright',
            rating: 2,
            characteristics: ['Solo Project', 'Research Presentation', 'Research Paper'],
        }]
    });
};

const evaluationInfo = (req, res) => {
    res.render('evaluation-info', {title: 'Evaluation Info'});
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
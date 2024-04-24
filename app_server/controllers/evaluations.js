const homelist = (req, res) => {
    res.render('evaluations-list', {title: 'Home'});
};

const evaluationInfo = (req, res) => {
    res.render('index', {title: 'Evaluation Info'});
};

const addComment = (req, res) => {
    res.render('index', {title: 'Add Comment'});
};

module.exports = {
    homelist,
    evaluationInfo,
    addComment
}
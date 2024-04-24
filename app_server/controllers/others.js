const about = (req, res) => {
    res.render('index', {title: 'About' });
};
const help = (req, res) => {
    res.render('index', {title: 'Help'});
}

module.exports = {
    about,
    help
};
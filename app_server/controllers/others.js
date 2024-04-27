const about = (req, res) => {
    res.render('generic-text', {title: 'About' });
};
const help = (req, res) => {
    res.render('generic-text', {title: 'Help'});
}

module.exports = {
    about,
    help
};
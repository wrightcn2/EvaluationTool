const mongoose = require('mongoose');
const Eval = mongoose.model('Evaluation');

const skillsCreate = (req, res) => {
    res
    .status(200)
    .json({"status" : "success"});
};
const skillsReadOne = (req, res) => {
    res
    .status(200)
    .json({"status" : "success"});
};
const skillsUpdateOne = (req, res) => {
    res
    .status(200)
    .json({"status" : "success"});
};
const skillsDeleteOne = (req, res) => {
    res
    .status(200)
    .json({"status" : "success"});
};

module.exports = {
    skillsCreate,
    skillsReadOne,
    skillsUpdateOne,
    skillsDeleteOne
  };
const mongoose = require('mongoose');
const Eval = mongoose.model('Evaluation');

const evaluationsList = (req, res) => {
    res
    .status(200)
    .json({"status" : "success"});
};
const evaluationsCreate = (req, res) => {
    res
    .status(200)
    .json({"status" : "success"});
};
const evaluationsReadOne = (req, res) => {
    res
    .status(200)
    .json({"status" : "success"});
};
const evaluationsUpdateOne = (req, res) => {
    res
    .status(200)
    .json({"status" : "success"});
};
const evaluationsDeleteOne = (req, res) => {
    res
    .status(200)
    .json({"status" : "success"});
};

module.exports = {
    evaluationsList,
    evaluationsCreate,
    evaluationsReadOne,
    evaluationsUpdateOne,
    evaluationsDeleteOne
};
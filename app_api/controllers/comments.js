const mongoose = require('mongoose');
const Eval = mongoose.model('Evaluation');

const commentsCreate = (req, res) => {
    res
    .status(200)
    .json({"status" : "success"});
};
const commentsReadOne = (req, res) => {
    res
    .status(200)
    .json({"status" : "success"});
};
const commentsUpdateOne = (req, res) => {
    res
    .status(200)
    .json({"status" : "success"});
};
const commentsDeleteOne = (req, res) => {
    res
    .status(200)
    .json({"status" : "success"});
};

module.exports = {
    commentsCreate,
    commentsReadOne,
    commentsUpdateOne,
    commentsDeleteOne
  };
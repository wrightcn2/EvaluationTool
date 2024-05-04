const mongoose = require('mongoose');
const Eval = mongoose.model('Evaluation');

const contentCreate = (req, res) => {
    res
    .status(200)
    .json({"status" : "success"});
};
const contentReadOne = (req, res) => {
    res
    .status(200)
    .json({"status" : "success"});
};
const contentUpdateOne = (req, res) => {
    res
    .status(200)
    .json({"status" : "success"});
};
const contentDeleteOne = (req, res) => {
    res
    .status(200)
    .json({"status" : "success"});
};

module.exports = {
    contentCreate,
    contentReadOne,
    contentUpdateOne,
    contentDeleteOne
  };
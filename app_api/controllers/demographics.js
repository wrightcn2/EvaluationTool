const mongoose = require('mongoose');
const Eval = mongoose.model('Evaluation');

const demographicsCreate = (req, res) => {
    res
    .status(200)
    .json({"status" : "success"});
};
const demographicsReadOne = (req, res) => {
    res
    .status(200)
    .json({"status" : "success"});
};
const demographicsUpdateOne = (req, res) => {
    res
    .status(200)
    .json({"status" : "success"});
};
const demographicsDeleteOne = (req, res) => {
    res
    .status(200)
    .json({"status" : "success"});
};

module.exports = {
    demographicsCreate,
    demographicsReadOne,
    demographicsUpdateOne,
    demographicsDeleteOne
  };
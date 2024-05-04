const mongoose = require('mongoose');
const Eval = mongoose.model('Evaluation');

const nonverbalCreate= (req, res) => {
    res
    .status(200)
    .json({"status" : "success"});
};
const nonverbalReadOne = (req, res) => {
    res
    .status(200)
    .json({"status" : "success"});
};
const nonverbalUpdateOne = (req, res) => {
    res
    .status(200)
    .json({"status" : "success"});
};
const nonverbalDeleteOne = (req, res) => {
    res
    .status(200)
    .json({"status" : "success"});
};

module.exports = {
    nonverbalCreate,
    nonverbalReadOne,
    nonverbalUpdateOne,
    nonverbalDeleteOne
  };
const mongoose = require('mongoose');

const demographicsSchema = new mongoose.Schema({
    groupMembers:{
        type: [String],
        required: true
    },
    date: {
        type: String,
        required: true
    },
    evaluatorName: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    }
});
const contentSchema = new mongoose.Schema({
    introduction: {
        type: Number,
        required: true 
    },
    organization: {
        type: Number,
        required: true
    },
    timeFrame: {
        type: Number,
        required: true
    },
    visualAid: {
        type: Number,
        required: true
    },
    preparation: {
        type: Number,
        required: true
    },

});
const verbalSchema = new mongoose.Schema({
  
    ethusiasm: {
        type: Number,
        required: true 
    },
    elocution: {
        type: Number,
        required: true
    },
    vocalPause: {
        type: Number,
        required: true
    },
});
const nonverbalSchema = new mongoose.Schema({
    eyeContact: {
        type: Number,
        required: true
    },
    gestures: {
        type: Number,
        required: true
    },

});
const commentSchema = new mongoose.Schema({
    author: String,
    rating: {
        type: Number,
        required: true,
        min: 0,
        max: 5
    },
    commentText: String,
    createdOn: {
        type: Date,
        'default': Date.now
    }
});
const evaluationSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    names: [String],
    rating: {
        type: Number,
        'default': 0,
        min: 0,
        max: 4
    },
    characteristics: [String],
    demographics: [demographicsSchema],
    content: [contentSchema],
    verbal: [verbalSchema],
    nonverbal: [nonverbalSchema],
    comments: [commentSchema]
});

mongoose.model('Evaluation', evaluationSchema)
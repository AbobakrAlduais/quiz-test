const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const QuestionSchema = new Schema({
    body: {
        type: String
    },
    options: {
        type: Array
    },
    answer: {
        type: String
    }
});
module.exports = mongoose.model('questin', QuestionSchema)
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const PromptSchema = new Schema({
    _id: {
        type: Schema.Types.ObjectId,
        auto: true
    },
    ps_id: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    question: {
        type: String
    },
    answer: {
        type: String
    },
    isDone: {
        type: Boolean,
        default: false
    },
    nextQuestion: {
        type: Schema.Types.ObjectId
    }
}, { timestamps: true });
const Prompt = mongoose.model('prompt', PromptSchema);

module.exports = Prompt;

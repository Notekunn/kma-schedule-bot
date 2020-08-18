const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const PromptSchema = new Schema({
    psid: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    value: {
        type: String,
        required: true
    }
});
const Prompt = mongoose.model('prompt', PromptSchema);

module.exports = Prompt;

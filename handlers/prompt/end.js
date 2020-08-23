const Prompt = require('../../models/Prompt');
const connect = require('../events/connect');
const promptAnswer = async function (names = []) {
    console.log('<prompt_answer>');
    const prompts = await Prompt.find({ name: { $in: names } }).sort({ updatedAt: -1 });
    const result = {};
    prompts.forEach(e => {
        if (e.isDone) result[e.name] = e.answer;
    })
    return result;
}

module.exports = async function (last_questions, psid) {
    console.log('<prompt_end>');
    const { client } = this;
    switch (last_questions) {
        case "student_pass":
            const { student_code, student_pass } = await promptAnswer(['student_code', 'student_pass']);
            connect(client, psid, { student_code, student_pass });
            break;
        default:
            break;
    }
}
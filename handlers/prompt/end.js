const Prompt = require('../../models/Prompt');
const promptAnswer = async function (names = []) {
    console.log('<prompt_answer>');
    const prompts = await Prompt.find({ name: { $in: names } }).sort({ updatedAt: -1 });
    const result = {};
    prompts.forEach(e => {
        if (e.isDone) result[e.name] = e.answer;
    })
    return result;
}

module.exports = async function (last_questions, ps_id) {
    console.log('<prompt_end>');
    const { client } = this;
    switch (last_questions) {
        case "student_pass":
            const { student_code, student_pass } = await promptAnswer(['student_code', 'student_pass']);
            client.sendText(ps_id, `Login with ${student_code} | ${student_pass}`);
            break;
        default:
            break;
    }
}
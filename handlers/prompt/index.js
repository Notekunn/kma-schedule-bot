const Prompt = require('../../models/Prompt');
const User = require('../../models/User');
const { Types } = require('mongoose');
const promptAsk = async function (ps_id, prompt_id) {
    console.log('<prompt_ask>', ps_id, prompt_id);
    const { client } = this;
    const prompt = await Prompt.findById(prompt_id);
    console.log(prompt);
    if (!prompt || !prompt.question) return;
    client.sendText(prompt.ps_id, prompt.question);
    console.log(await User.findOneAndUpdate({ ps_id }, { currentQuestion: prompt_id }));
    return;
}
const promptEnd = require('./end');
const promptCreate = async function (ps_id, questions) {
    console.log('<prompt_create>');
    if (!Array.isArray(questions)) questions = [questions];
    for (let i = questions.length - 1; i >= 0; i--) {
        questions[i]._id = Types.ObjectId();
        questions[i].ps_id = ps_id;
        if (i < questions.length - 1) {
            questions[i].nextQuestion = questions[i + 1]._id;
        }
    }
    await Prompt.insertMany(questions);
    await promptAsk.bind(this)(ps_id, questions[0]._id);
    return;
}
const promptUpdate = async function (ps_id, prompt_id, answer) {
    console.log('<prompt_update>');
    const prompt = await Prompt.findById(prompt_id);
    const user = await User.findOne({ ps_id });
    if (!prompt) return promptFflush(ps_id);
    prompt.answer = answer;
    prompt.isDone = true;
    await prompt.save();
    if (prompt.nextQuestion) {
        user.currentQuestion = prompt.nextQuestion;
        promptAsk.bind(this)(ps_id, prompt.nextQuestion);
        user.save();
    }
    else {
        await promptEnd.bind(this)(prompt.name, ps_id);
        promptFflush(ps_id);
    }
}
const promptFflush = async function (ps_id) {
    console.log('<prompt_fflush>');
    const user = await User.findOne({ ps_id });
    user.currentQuestion = null;
    await Prompt.deleteMany({ ps_id });
    user.save();
    console.log('<prompt_fflush_done>');
    return;
}
module.exports = {
    promptAsk,
    promptCreate,
    promptFflush,
    promptUpdate,
}
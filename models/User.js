const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const UserSchema = new Schema({
    ps_id: {
        type: String,
        required: true
    },
    fb_id: {
        type: String
    },
    first_name: {
        type: String
    },
    last_name: {
        type: String
    },
    profile_pic: {
        type: String
    },
    prompt_id: {
        type: Schema.Types.ObjectId,
        required: true
    }
});
const User = mongoose.model('user', UserSchema);

module.exports = User;
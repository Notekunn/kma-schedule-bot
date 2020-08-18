const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const AccountSchema = new Schema({
    studentCode: {
      type: String,
      required: true
    },
    password: {
      type: String,
      required: true
    },
    name: {
      type: String
    },
    ps_id: {
      type: String,
      required: true
    }
  });
const Account = mongoose.model('account', AccountSchema);

module.exports = Account;
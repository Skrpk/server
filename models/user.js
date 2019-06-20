const { Schema } = require('mongoose');
const mongoose = require('mongoose');

const UserSchema = new Schema({
  name: { type: String, lowercase: true, index: true },
  email: String,
  status: String,
  password: String,
});

module.exports = mongoose.model('User', UserSchema);

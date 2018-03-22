const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  openId: {type: String, required: true, unique: true}
});

export const User = mongoose.model('User', UserSchema);

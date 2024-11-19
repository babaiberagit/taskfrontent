const mongoose = require('mongoose');

const  userSchema = new mongoose.Schema({
  userName: {
    type: String,
    unique: true,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    select: false,
  },
}, { timestamps: true});

const UserModel = mongoose.model('User', userSchema);

module.exports = UserModel;

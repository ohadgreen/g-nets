const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
    username: String,
    password: String,
    nickname: String,
    email: String,
});

mongoose.model('users', userSchema); // load a schema to a mongoose model (two arguments)
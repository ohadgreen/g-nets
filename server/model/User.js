const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
    intcode: Number,
    username: String,
    password: String,
    nickname: String,
    email: String,
    avatar: String,
    bets: {totalBets: Number, totalScore: Number, avgScore: Number}
});

mongoose.model('users', userSchema);
const mongoose = require("mongoose");
const jwt = require('jsonwebtoken');
const User = mongoose.model("users");
const allAvatarImages = require('../../resources/images/avatarImageList');
const AVATAR_CHOICE_LIMIT = 5;

module.exports = app => {    
    // register new user
    app.post('/api/auth/user', function (req, res) {
        const { username, password, nickname, email, avatar } = req.query;
        console.log('req.query: ' + JSON.stringify(req.query));
        console.log('username: ' + username);

        user = new User({
            username: username,
            password: password,
            nickname: nickname,
            email: email,
            avatar: avatar,
            bets: {totalBets: 0, totalScore: 0, avgScore: 0}
        });

        // console.log("Server new user: " + user);
        user.save(function (err) {
            if (err)
                res.send({ text: err });
            else {
                const authUser = jwtSign(user);
                console.log('new user: ', authUser);                          
                res.send({ authUser }); 
            }
        });
    });
    // loggin existing user
    app.get("/api/auth/user", async (req, res) => {
        const { username, password } = req.query;
        let errorMsg;
        const user = await User.findOne({ 'username': username });
        if(!user){
            errorMsg = 'user not found on db';
            console.log(errorMsg);            
            res.send({ error: errorMsg });
        }
        else { 
            if(user.password !== password){
                errorMsg = 'password mismatch';
                console.log(errorMsg);
                res.send({ error: errorMsg });
            }
            else{
                const authUser = jwtSign(user);
                // console.log('user: ', authUser);                          
                res.send({ authUser }); 
            }            
        }        
    })

    app.get("/api/auth/users", async (req, res) => {
        const users = await User.find({}).select('username avatar -_id') //select only username and avatar fields
        const allUsernames = users.map(u => {return u.username});
        const avatarChoice = avatarImagesChoice(users);
        res.send({ allUsernames, avatarChoice });
    });
}

function jwtSign(user) {
    const userToken = jwt.sign({ email: user.email, username: user.username, _id: user._id }, 'sssshhhh');
    // console.log('userToken: ' + userToken);
    return {
        id: user._id,
        username: user.username,
        nickname: user.nickname,
        avatar: user.avatar,
        token: userToken
    }
}

function avatarImagesChoice(users) {
    let avatarChoice = [];
    const avatarTaken = users.map(u => {return u.avatar});
    // console.log(`all avatars: ${allAvatarImages}`);
    // console.log(`avatar taken: ${avatarTaken}`);
    for(avatar of allAvatarImages){
        if(avatarTaken.indexOf(avatar) === -1 && avatarChoice.length < AVATAR_CHOICE_LIMIT){
            avatarChoice.push(avatar);
        }
    }
    return avatarChoice;
}
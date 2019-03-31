const mongoose = require("mongoose");
const jwt = require('jsonwebtoken');
const User = mongoose.model("users");
const allAvatarImages = require('../../resources/images/avatarImageList');
const AVATAR_CHOICE_LIMIT = 5;

module.exports = app => {    
    // register new user
    app.post('/api/auth/user', async (req, res) => {
        const { username, password, nickname, email, avatar } = req.query;
        console.log('req.query: ' + JSON.stringify(req.query));
        console.log('username: ' + username);

        const UserCounter = mongoose.model('UserCounter', new mongoose.Schema({ usercode: Number }, { collection : 'usercounter' }));
        const userCounter = await UserCounter.findOne();
        let { usercode } = userCounter;

        user = new User({
            intcode: usercode++,
            username: username,
            password: password,
            nickname: nickname,
            email: email,
            avatar: avatar,
            bets: {totalBets: 0, totalScore: 0, avgScore: 0}
        });

        // console.log("Server new user: " + user);
        const newUserInDb = await user.save();
        if(!newUserInDb){
            errorMsg = 'error while saving new user';
            console.log(errorMsg);            
            res.send({ error: errorMsg });
        }
        else {
              console.log(JSON.stringify(newUserInDb));
              const updateCounter = await UserCounter.findOneAndUpdate({}, {$inc: {usercode : 1}}, {new: true}); // increment usercounter collection
              console.log('updateCounter: ' + JSON.stringify(updateCounter));
              res.send({ authUser: jwtSign(newUserInDb) })
        }
    });

    // loggin existing user
    app.get("/api/auth/user", async (req, res) => {
        const { username, password } = req.query;
        let errorMsg;
        const user = await User.findOne({ 'username': username });
        if(!user){
            errorMsg = 'user not found in db';
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
                console.log('user: ', authUser);                          
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
    // const userToken = jwt.sign({ email: user.email, username: user.username, _id: user._id }, 'sssshhhh');
    // console.log('userToken: ' + userToken);
    return {        
        id: user._id,
        intcode: user.intcode,
        username: user.username,
        nickname: user.nickname,
        avatar: user.avatar,
        token: 'fake-token'
    }
}

function avatarImagesChoice(users) {
    let avatarChoice = [];
    const avatarTaken = users.map(u => {return u.avatar});
    // console.log(`all avatars: ${allAvatarImages}`);
    for(avatar of allAvatarImages){
        if(avatarTaken.indexOf(avatar) === -1 && avatarChoice.length < AVATAR_CHOICE_LIMIT){
            avatarChoice.push(avatar);
        }
    }
    return avatarChoice;
}
const mongoose = require("mongoose");
const jwt = require('jsonwebtoken');
const User = mongoose.model("users");

module.exports = app => {    
    app.get('/api/auth/test', function (req, res) { 
        console.log(req.query);
        res.send({ msg: 'User auth test!!!' })});

    // register new user
    app.post('/api/auth/user', function (req, res) {
        const { username, password, nickname, email } = req.query;
        console.log('req.query: ' + JSON.stringify(req.query));
        console.log('username: ' + username);

        user = new User({
            username: username,
            password: password,
            nickname: nickname,
            email: email,
        });

        console.log("Server new user: " + user);
        user.save(function (err) {
            if (err)
                res.send({ text: err });
            else {
                return res.json({ data: user });
            }
        });
    });

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
                const userToken = jwt.sign({ email: user.email, username: user.username, _id: user._id }, 'sssshhhh');
                console.log('userToken: ' + userToken);

                let authUser = {
                    id: user._id,
                    username: user.username,
                    nickname: user.nickname,
                    token: userToken
                }
                // console.log('user: ', authUser);                          
                res.send({ authUser }); 
            }            
        }        
    })

    app.get("/api/auth/users", async (req, res) => {
        const users = await User.find({}).select('username -_id') //filter only usernames
        res.send(users);
    });
}
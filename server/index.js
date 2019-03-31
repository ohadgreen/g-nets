const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require("path");
const router = express.Router();
require('./model/Game');
require('./model/Team');
require('./model/User');
const keys = require('./config/keys');

mongoose.connect(keys.mongoURI, { useNewUrlParser: true, useFindAndModify: false, keepAlive: true, keepAliveInitialDelay: 30000 });

const app = express();
app.use('/', router);
app.use(bodyParser.urlencoded({
    extended: false,
}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false,
}));

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", '*');
  res.header("Access-Control-Allow-Credentials", true);
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
  res.header("Access-Control-Allow-Headers", 'Origin,X-Requested-With,Content-Type,Accept,content-type,application/json');
  next();
});

require('./routes/auth/UserAuth')(app);
require('./routes/app/FetchGames')(app);
require('./routes/app/FetchScores')(app);

if (process.env.NODE_ENV === "production") {    
    console.log('*** runnig prod build');
    const buildPath = path.resolve(__dirname, "../client/build");    
    // tell Express to server production assets like main.js
    app.use(express.static(buildPath));
  
    // Express will server the index.html file if it doesn't recognize the route    
    app.get("*", (req, res) => {
      res.sendfile(path.resolve(__dirname, "../client", "build", "index.html"));
    });
  }

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Listening on port ${port}`));

router.get('/api/hello', (req, res) => {
    res.send({ msg: 'Gnets backend' });
})
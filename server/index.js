const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const fs = require('fs');
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

require('./routes/auth/UserAuth')(app);
require('./routes/app/FetchGames')(app);
require('./routes/app/FetchScores')(app);

if (process.env.NODE_ENV === "production") {
    const path = require("path");
    console.log('*** running prod build');    
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
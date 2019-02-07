const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const router = express.Router();
require('./model/Game');
require('./model/Team');
require('./model/User');
const keys = require('./config/keys');

mongoose.connect(keys.mongoURI, { useNewUrlParser: true, useFindAndModify: false });

const app = express();
app.use('/', router);
app.use(bodyParser.urlencoded({
    extended: false,
}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false,
}));
app.use(express.static(__dirname + '/public'));

require('./routes/auth/UserAuth')(app);
require('./routes/app/FetchGames')(app);
require('./routes/batch/PullGameSched')(app);
require('./routes/batch/PullTeamStats')(app);
require('./routes/app/FetchScores')(app);

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Listening on port ${port}`));

router.get('/api/hello', (req, res) => {
    res.send({ msg: 'Gnets backend' });
})
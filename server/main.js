const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const router = express.Router();
require('./model/Game');
require('./model/Team');
const keys = require('./config/keys');

mongoose.connect(keys.mongoURI);

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

require('./routes/PullGameSched')(app);
require('./routes/PullTeamStats')(app);

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Listening on port ${port}`));

router.get('/api/hello', (req, res) => {
    res.send({ msg: 'Gnets backend' });
})
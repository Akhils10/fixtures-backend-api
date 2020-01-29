const Teams = require('../models/Teams');
const Fixtures = require('../models/Fixtures');

exports.search = (req, res) => {
    Teams.getTeams().then(teams => {
        res.status(200);
        res.json(teams);
    })
    .catch((err) => {
        res.status(500);
        res.send(err);
    });
}
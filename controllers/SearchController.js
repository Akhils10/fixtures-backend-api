const Teams = require('../models/Teams');
const Fixtures = require('../models/Fixtures');

exports.search = async (req, res) => {
    let searchNeedle = req.params.title
    let searchData = [];
    
    await Teams.getTeams().then(teams => searchData.push({type: "teams", data: teams.filter(data => data.name.toLowerCase() == searchNeedle.toLowerCase())}))
    await Fixtures.getFixtures().then(fixtures => searchData.push({type: "fixtures", data: fixtures.filter(data => data.home_team.toLowerCase() == searchNeedle.toLowerCase() || data.away_team.toLowerCase() == searchNeedle.toLowerCase())}))

    res.status(200).json(searchData);

}

const Teams = require('../models/Teams');
const Fixtures = require('../models/Fixtures');

exports.search = async (req, res) => {
    let searchNeedle = req.params.title
    let searchData = [];
    let response = []

    await Teams.getTeams().then(teams => searchData.push({type: "teams", data: teams}))
    await Fixtures.getFixtures().then(fixtures => searchData.push({type: "fixtures", data: fixtures}))
    response = searchData.filter(data => {
        if(data.type === "teams"){
            return data.data[0].name.toLowerCase().includes(searchNeedle.toLowerCase())
        }else if(data.type === "fixtures"){
            return data.data[0].home_team.toLowerCase().includes(searchNeedle.toLowerCase()) || data.data[0].away_team.toLowerCase().includes(searchNeedle.toLowerCase())
        }
    });

    res.status(200).json(response);

}

const PermissionController = require('./PermissionController');
const Fixtures = require('../models/Fixtures');
const uuidv1 = require('uuid/v1');


exports.getFixtures = (req, res) => {
    PermissionController.hasPermission(req, res, ['manage_fixtures'], () => {
        Fixtures.getFixtures().then(fixtures => {
            res.status(200);
            res.json(fixtures);
        })
        .catch((err) => {
            res.status(500);
            res.send(err);
        });
    });
}

exports.getPendingFixtures = (req, res) => {
    PermissionController.hasPermission(req, res, ['manage_fixtures', "view_fixtures"], () => {
        Fixtures.getPendingFixtures().then(fixtures => {
            res.status(200);
            res.json(fixtures);
        })
        .catch((err) => {
            res.status(500);
            res.send(err);
        });
    });
}

exports.getCompletedFixtures = (req, res) => {
    PermissionController.hasPermission(req, res, ['manage_fixtures', "view_fixtures"], () => {
        Fixtures.getCompletedFixtures().then(fixtures => {
            res.status(200);
            res.json(fixtures);
        })
        .catch((err) => {
            res.status(500);
            res.send(err);
        });
    });
}

exports.getOneFixture = (req, res) => {
    PermissionController.hasPermission(req, res, ["manage_fixtures", "view_fixtures"], () => {
        Fixtures.getFixture(req.params.id)
            .then(fixtures => {
                res.status(200);
                res.json(fixtures);
            })
            .catch((err) => {
                res.status(500);
                res.send(err);
            });
    });
}

exports.editFixture = (req, res) => {
    console.log('data is =', req.body.home_team)
    const fixtureData = {
        home_team: req.body.home_team, 
        away_team: req.body.away_team,
        match_time: req.body.match_time,
        status: req.body.status,
        link: !req.body.link || req.body.link == "" ? req.body.home_team.slice(0,3).toLowerCase() + 'vs' + req.body.away_team.slice(0,3).toLowerCase() + uuidv1() : req.body.link
    }
    PermissionController.hasPermission(req, res, ["manage_fixtures"], () => {
        Fixtures.update(req.params.id, fixtureData)
            .then(fixtures => {
                res.status(200);
                res.json({fixture_id: fixtures, message: 'fixture updated'});
            })
            .catch((err) => {
                res.status(500);
                res.send(err);
            });
    });
}

exports.addFixture = (req, res) => {
    const fixtureData = {
        home_team: req.body.home_team, 
        away_team: req.body.away_team,
        match_time: req.body.match_time,
        status: req.body.status,
        link: !req.body.link || req.body.link == "" ? req.body.home_team.slice(0,3).toLowerCase() + 'vs' + req.body.away_team.slice(0,3).toLowerCase() + uuidv1() : req.body.link
    }

    PermissionController.hasPermission(req, res, ['manage_fixtures'], () => {
        Fixtures.create(fixtureData)
            .then(fixture => {
                res.status(200);
                res.json({fixture_id: fixture[0]});
            })
            .catch((err) => {
                res.status(500);
                res.send(err);
            });
    });
};

exports.removeFixture = (req, res) => {
    console.log(req.params.id)
    PermissionController.hasPermission(req, res, ['manage_fixtures'], () => {
        if(req.params.id){
            Fixtures.delete(req.params.id)
            .then((deleted) => {
                res.status(200);
                res.json({message: "deleted"});
            })
            .catch((err) => {
                res.status(500);
                res.send(err);
            });
        }else{
            res.status(400);
            res.json();
        }
        
    });
};

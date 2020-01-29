const PermissionController = require('./PermissionController');
const Fixtures = require('../models/Fixtures');

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
    const fixtureData = {
        name: req.body.name, 
        links: !req.body.links || req.body.links == "" ? req.body.name.replace(' ', '') : req.body.links
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
        name: req.body.name, 
        links: !req.body.links || req.body.links == "" ? req.body.name.replace(' ', '') : req.body.links
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

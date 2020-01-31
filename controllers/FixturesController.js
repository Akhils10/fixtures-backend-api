const PermissionController = require('./PermissionController');
const Fixtures = require('../models/Fixtures');
const uuidv1 = require('uuid/v1');
const redis = require('redis');
let client;

if(process.env.NODE_ENV === 'production'){
    client = redis.createClient('redis://h:pcc7f42fcb7baff28a020b60bc2def303b665db84586f2f8226da890651d203fb@ec2-3-210-246-86.compute-1.amazonaws.com:10749');
}else if(process.env.NODE_ENV === 'development'){
    client = redis.createClient(process.env.REDIS_PORT, process.env.REDIS_HOST);
}else{
    client = redis.createClient(6379, '192.168.99.100');
}


exports.getFixtures = (req, res) => {
    if(req.session.user){
        PermissionController.hasPermission(req, res, ['manage_fixtures'], () => {
            client.get("/fixtures", (err, result) => {
                if(err){
                    return res.json(err);
                }
                if(result != null){
                    return res.json({source: 'cache', data: JSON.parse(result)})
                }else{
                    Fixtures.getFixtures().then(fixtures => {
                        client.setex("/fixtures", 300, JSON.stringify(fixtures))
                        res.status(200);
                        res.json(fixtures);
                    })
                    .catch((err) => {
                        res.status(500);
                        res.send(err);
                    });
                }
            })
            
        });
    }else{
        res.status(401);
        res.json({
            message: 'please login'
        })
    }
    
}

exports.getPendingFixtures = (req, res) => {
    if(req.session.user){
        PermissionController.hasPermission(req, res, ['manage_fixtures', "view_fixtures"], () => {
            client.get("/pendingfixtures", (err, result) => {
                if(err){
                    return res.json(err);
                }
                if(result != null){
                    return res.json({source: 'cache', data: JSON.parse(result)})
                }else{
                    Fixtures.getPendingFixtures().then(fixtures => {
                        client.setex("/pendingfixtures", 300, JSON.stringify(fixtures))
                        res.status(200);
                        res.json(fixtures);
                    })
                    .catch((err) => {
                        res.status(500);
                        res.send(err);
                    });
                }
            })
            
        });
    }else{
        res.status(401);
        res.json({
            message: 'please login'
        })
    }
    
}

exports.getCompletedFixtures = (req, res) => {
    if(req.session.user){
        PermissionController.hasPermission(req, res, ['manage_fixtures', "view_fixtures"], () => {
            client.get("/completedfixtures", (err, result) => {
                if(err){
                    return res.json(err);
                }
                if(result != null){
                    return res.json({source: 'cache', data: JSON.parse(result)})
                }else{
                    Fixtures.getCompletedFixtures().then(fixtures => {
                        client.setex("/completedfixtures", 300, JSON.stringify(fixtures))
                        res.status(200);
                        res.json(fixtures);
                    })
                    .catch((err) => {
                        res.status(500);
                        res.send(err);
                    });
                }
            })
            
        });
    }else{
        res.status(401);
        res.json({
            message: 'please login'
        })
    }
    
}

exports.getOneFixture = (req, res) => {
    if(req.session.user){
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
    }else{
        res.status(401);
        res.json({
            message: 'please login'
        })
    }
    
}

exports.editFixture = (req, res) => {
    if(req.session.user){
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
    }else{
        res.status(401);
        res.json({
            message: 'please login'
        })
    }
    
}

exports.addFixture = (req, res) => {
    if(req.session.user){
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
    }else{
        res.status(401);
        res.json({
            message: 'please login'
        })
    }
    
};

exports.removeFixture = (req, res) => {
    if(req.session.user){
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
    }else{
        res.status(401);
        res.json({
            message: 'please login'
        })
    }
    
};

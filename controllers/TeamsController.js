const PermissionController = require('./PermissionController');
const Teams = require('../models/Teams');
const redis = require('redis');
let client;

if(process.env.NODE_ENV === 'production'){
    client = redis.createClient('redis://h:pcc7f42fcb7baff28a020b60bc2def303b665db84586f2f8226da890651d203fb@ec2-3-210-246-86.compute-1.amazonaws.com:10749');
}else if(process.env.NODE_ENV === 'development'){
    client = redis.createClient(process.env.REDIS_PORT, process.env.REDIS_HOST);
}else{
    client = redis.createClient(6379, '192.168.99.100');
}


exports.getTeams = (req, res) => {
    if(req.session.user){
        PermissionController.hasPermission(req, res, ['manage_teams'], () => {
            client.get("/teams", (err, result) => {
                if(err){
                    return res.json(err);
                }
                if(result != null){
                    return res.json({source: 'cache', data: JSON.parse(result)})
                }else{
                    Teams.getTeams().then(teams => {
                        client.setex("/teams", 300, JSON.stringify(teams))
                        res.status(200);
                        res.json(teams);
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

exports.getOneTeam = (req, res) => {
    if(req.session.user){
        PermissionController.hasPermission(req, res, ["manage_teams", "view_teams"], () => {
            client.get("/team/"+req.params.id, (err, result) => {
                if(err){
                    return res.json(err);
                }
                if(result != null){
                    return res.json({source: 'cache', data: JSON.parse(result)})
                }else{
                    Teams.getTeam(req.params.id)
                        .then(teams => {
                            client.setex("/team/"+req.params.id, 300, JSON.stringify(teams))
                            res.status(200);
                            res.json(teams);
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

exports.editTeam = (req, res) => {
    if(req.session.user){
        const teamData = {
            name: req.body.name, 
            links: !req.body.links || req.body.links == "" ? req.body.name.replace(' ', '') : req.body.links
        }
        PermissionController.hasPermission(req, res, ["manage_teams"], () => {
            Teams.update(req.params.id, teamData)
                .then(teams => {
                    res.status(200);
                    res.json({team_id: teams, message: 'team updated'});
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

exports.addTeam = (req, res) => {
    if(req.session.user){
        const teamData = {
            name: req.body.name, 
            links: !req.body.links || req.body.links == "" ? req.body.name.replace(' ', '') : req.body.links
        }
        PermissionController.hasPermission(req, res, ['manage_teams'], () => {
            Teams.create(teamData)
                .then(team => {
                    res.status(200);
                    res.json({team_id: team[0]});
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

exports.removeTeam = (req, res) => {
    if(req.session.user){
        PermissionController.hasPermission(req, res, ['manage_teams'], () => {
            if(req.params.id){
                Teams.delete(req.params.id)
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

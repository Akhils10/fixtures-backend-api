const PermissionController = require('./PermissionController');
const Teams = require('../models/Teams');

exports.getTeams = (req, res) => {
    PermissionController.hasPermission(req, res, ['manage_teams'], () => {
        Teams.getTeams().then(teams => {
            res.status(200);
            res.json(teams);
        })
        .catch((err) => {
            res.status(500);
            res.send(err);
        });
    });
}

exports.getOneTeam = (req, res) => {
    PermissionController.hasPermission(req, res, ["manage_teams", "view_teams"], () => {
        Teams.getTeam(req.params.id)
            .then(teams => {
                res.status(200);
                res.json(teams);
            })
            .catch((err) => {
                res.status(500);
                res.send(err);
            });
    });
}

exports.editTeam = (req, res) => {
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
}

exports.addTeam = (req, res) => {
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
};

exports.removeTeam = (req, res) => {
    console.log(req.params.id)
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
};

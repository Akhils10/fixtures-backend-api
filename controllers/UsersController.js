const TokenController = require('./TokenController');
const PermissionController = require('./PermissionController');
const Users = require('../models/Users');

exports.users_get = (req, res) => {
  PermissionController.hasPermission(req, res, 'get_users', () => {
    Users.findAll().then((users) => {
      res.status(200);
      res.json(users);
    })
    .catch((err) => {
      res.status(500);
      res.send(err);
    });
  });
};

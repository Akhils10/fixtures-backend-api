const { check, validationResult } = require('express-validator/check');
const { matchedData } = require('express-validator/filter');
const BcryptController = require('./BcryptController');
const TokenController = require('./TokenController');
const Users = require('../models/Users');
const Roles = require('../config/roles');

// Export express-validator array
exports.validateReg = [
    check('email')
        .isEmail().withMessage('Email must be a valid email address')
        .trim()
        .normalizeEmail()
        .custom((email) => {
        return Users.getUserByEmail(email)
            .then(user => {
                if (user) {
                    throw new Error('Email is already registered')
                }
                return true;
            })
        }),   
        
    check('password')
        .isLength({ min: 8 }).withMessage('Password must be 8 characters minimum')
        .matches(/\d/).withMessage('Password must contain at least 1 number'),

    check('name')
        .isLength({ min: 3 }).withMessage('Name cannot be less than 3 characters'),
];

// Function below are used for registering users

const createUserAndLogin = (req, res) => {
    const hashed = BcryptController.getHashedPassword(req.password);
    const user = {username: req.email, email: req.email, name: req.name, passwordSalt: hashed.salt, password: hashed.passwordHash, role: req.role};
    Users.create(user).then(createdUser => console.log(createdUser))
        .then((login) => {
            res.status(200);
            res.json({
                message: 'success'
            });
        })
        .catch((err) => {
            res.status(500);
            res.send(err);
        });
};

exports.postReg = (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        res.status(400);
        res.json(errors.array());
    } else {
        const validatedData = matchedData(req);
        createUserAndLogin(validatedData, res);
    };
};

// Functions  below are used for signing in

const assignToken = (req, res) => {
    Users.getUserByEmail(req.email)
        .then((user) => {
            const payload = {
                id: user.id,
                email: user.email,
                iss: 'auth-service',
                permissions: user.role === 'adminUser' ? Roles.adminRoles : Roles.userRoles,
            };

            const secret = TokenController.getSecret();
            const token = TokenController.getToken(payload, secret);
            res.json({token: token});
        })
        .catch((err) => {
            console.log(err);
            res.status(500);
            res.json({err: err});
        });
    };
  
    exports.postLogin = (req, res) => {
        Users.getUserByEmail(req.body.email).then(login => {
        if (!login) {
            res.status(400);
            res.json({err: 'No user registered with this email'});
        }
        const pwd = req.body.password;
        const pwdSalt = login.passwordSalt;
        const hash = login.password;
        const isValid = BcryptController.checkPassword(pwd, pwdSalt, hash);

        if (!isValid) {
            res.status(400);
            res.json({err: 'Password is invalid'});
        } else {
            assignToken(login, res);
        }
        })
        .catch((err) => {
            console.log(err);
            res.status(500);
            res.json({err: err});
        });
    };
    
    exports.logins_get = (req, res) => {
        permissionController.hasPermission(req, res, 'get_logins', () => {
        Logins.findAll().then((permissions) => {
            res.status(200);
            res.json(permissions);
        })
        .catch((err) => {
            res.status(500);
            res.send(err);
        });
        });
    };

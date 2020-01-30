const jwt = require('jsonwebtoken');

// Returns secret only known to server at runtime
exports.getSecret = () => {
    // const secret = require('../config/secret.json').secret;
    const secret = 'aaasrtblyttr566rf';
    return secret;
};

// Returns token
exports.getToken = (payload, secretOrPrivateKey, options) => {
    // If no options object supplied, make token expire in 24h
    if (!options) {
        options = {expiresIn: '24h'};
    }
    return jwt.sign(payload, secretOrPrivateKey, options);
};

// Returns result of token validation
exports.validateToken = (token, secretOrPrivateKey) => {
    try{
        return jwt.verify(token, secretOrPrivateKey);
    }catch (err) {
        return err;
    }
};

// Returns validation result of token
exports.token_post = (req, res) => {
    res.send(this.validateToken(req.header.Authorization, this.getSecret()));
};

exports.hasPermission = (token, permission) => {
    const result = this.validateToken(token, this.getSecret());
    if(result.name === 'JsonWebTokenError') {
        return false;
    }else if (result.permissions) {
        let permissionSet = result.permissions;
        return permission.some(perm => permissionSet.includes(perm));
    }else {
        return false;
    }
};

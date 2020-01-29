const express = require('express');
const app = express()

const users = require('../../routes/user');

const callRoutes = () => {
    app.use('/api/v1/users', users);
}

module.exports = callRoutes;
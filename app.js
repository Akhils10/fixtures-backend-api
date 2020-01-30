const createError = require('http-errors');
const express = require('express');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const session = require('express-session');
const redisStore = require('connect-redis')(session);
const redis = require('redis');
let client;

if(process.env.NODE_ENV === 'production'){
    client = redis.createClient('redis://h:pa00ae15a3edd70cc2b4c15c087470b2eb3751f030b65f96178c6d4e8a3480f7e@ec2-52-2-161-194.compute-1.amazonaws.com:8669');
}else{
    client = redis.createClient(process.env.REDIS_PORT, process.env.REDIS_HOST);
}

client.on('connect', function(){
    console.log('connected to redis');
})



const app = express();
  
const AuthController = require('./controllers/AuthController');
const TeamsController = require('./controllers/TeamsController');
const FixturesController = require('./controllers/FixturesController');
const UsersController = require('./controllers/UsersController');
const SearchController = require('./controllers/SearchController');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(session({
    secret: 'aydfdvewlufgvewodflefelffefe7',
    saveUninitialized: true,
    resave: false,
    store: new redisStore({ host: process.env.REDIS_HOST, port: process.env.REDIS_PORT, client: client, ttl : 260})
}))


app.use('/api/v1/logout', UsersController.logout);

// Api endpoints (public)
app.route('/api/v1/signup')
    .post(AuthController.validateReg, AuthController.postReg)

app.route('/api/v1/login')
    .post(AuthController.postLogin)

app.route('/api/v1/teams')
    .get(TeamsController.getTeams);

app.route('/api/v1/team/:id')
    .get(TeamsController.getOneTeam)
    .patch(TeamsController.editTeam)
    .delete(TeamsController.removeTeam);

app.route('/api/v1/addteam')
    .post(TeamsController.addTeam);

// Fixtures route
app.route('/api/v1/fixtures')
    .get(FixturesController.getFixtures);

app.route('/api/v1/pendingfixtures')
    .get(FixturesController.getPendingFixtures);

app.route('/api/v1/completedfixtures')
    .get(FixturesController.getCompletedFixtures);

app.route('/api/v1/fixtures/:id')
    .get(FixturesController.getOneFixture)
    .patch(FixturesController.editFixture)
    .delete(FixturesController.removeFixture);

app.route('/api/v1/fixtures')
    .post(FixturesController.addFixture);

app.route('/api/v1/search/:title')
    .get(SearchController.search);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.json({
    message: err.message,
    error: req.app.get('env') === 'development' ? err : {}
  });
});


module.exports = app;

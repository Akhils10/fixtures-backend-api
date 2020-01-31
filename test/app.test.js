const knex = require('../config/config.test')
const request = require('supertest');
const app = require('../app')

describe('Teams Api', () => {
    before((done) => {
        // drop migrations
        knex.migrate.down().
        then(() => {
             // run migrations
            knex.migrate.latest()
                .then(() => {
                    // run seeds
                    return knex.seed.run(); 
                }).then(() => done())
            })
       
    })

    it('POST api/v1/signup should return error 400 because password is less than 8 characters ', (done) => { 
        request(app)
            .post('/api/v1/signup')
            .send({email: 'test1@test.com', password: 'test1', name: 'tester'})
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(function(res){
                res.body.password >= 8
            })
            .expect(400, done)
    })

    it('POST api/v1/signup should return json', (done) => { 
        request(app)
            .post('/api/v1/signup')
            .send({email: 'test20@test.com', password: 'testuser1', name: 'tester', role: 'adminUser'})
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(function(res){
                res.body.password >= 8
            })
            .expect(200, done)
    })

    it('POST api/v1/login should return json token', (done) => { 
        request(app)
            .post('/api/v1/login')
            .send({email: 'test2@test.com', password: 'testuser1'})
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(function(res){
                console.log(res.body)
            })
            .expect(200, done)
    })

    it('List all teams requires authorization, should return 403', (done) => { 
        request(app)
            .get('/api/v1/teams')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(401, done)
    })

    it('Search should be public and return json', (done) => { 
        request(app)
            .get('/api/v1/search/juventus')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200, done)
    })
})
# fixtures-backend-api
An API that serves the latest scores of fixtures of matches in a “Mock Premier League”

# Authentiation
Authentication for api endpoints using json web tokens (jwt)
Api access restricted to viewing for user accounts
Admin accounts have full access

# Api Routes

/api/v1/signup -POST

- body => {"name": "", "email":"", password: "", role: ""}
- password should contain at least 8 characters
- role should be 'adminUser' for admin account

/api/v1/login -POST

- body => {"email":"", password: ""}
- will return a token if successful

/api/v1/teams -GET

- protected route
- requires header - Authorization: Bearer <token>

/api/v1/team/:id -GET

- requires team id passed as params
- protected route
- requires header - Authorization: Bearer <token>

/api/v1/team/:id -DELETE

- requires team id passed as params
- protected route
- requires header - Authorization: Bearer <token>

/api/v1/team/:id -PATCH

- body => {"name": "Juventus FC", "links": "juventus"}
- requires team id passed as params
- protected route
- requires header - Authorization: Bearer <token>

/api/v1/teams -GET

- protected route
- requires header - Authorization: Bearer <token>

/api/v1/team/:id -GET

- requires team id passed as params
- protected route
- requires header - Authorization: Bearer <token>

/api/v1/team/:id -DELETE

- requires team id passed as params
- protected route
- requires header - Authorization: Bearer <token>

/api/v1/team/:id -PATCH

- body => {"name": "Juventus FC", "links": "juventus"}
- requires team id passed as params
- protected route
- requires header - Authorization: Bearer <token>

/api/v1/fixtures -GET

- protected route
- requires header - Authorization: Bearer <token>

/api/v1/fixture/:id -GET

- requires fixture id passed as params
- protected route
- requires header - Authorization: Bearer <token>

/api/v1/fixture/:id -DELETE

- requires fixture id passed as params
- protected route
- requires header - Authorization: Bearer <token>

/api/v1/fixture/:id -PATCH

- body => {"home_team": "Juventus FC", "away_team":"Real madrid", "team1_score":? 3, "team2_score":? 1, "status":"pending", "links": "juv-vs-mad"}
- Links are uniquely generated but you may overide by passing your own link 
- status may be "pending" or"completed"
- If the fixture is completed, put the team scores; team1_score for home_team
- requires team id passed as params
- protected route
- requires header - Authorization: Bearer <token>

/api/v1/search/:team-or-fixture-to-search -GET

- requires the search strinng
- Unprotected route, available to the public
- returns data from either teams or fixtures or both, whichever matches the search string


# To run:

- npm install
- edit database config in config/config.js
- run 'knex migrate:latest' to run migrations
- run 'knex seed:run' to seed database

- 'npm start' or 'npm run dev' to start server

# Dummy accounts

-  Admin account:
    - email: adminuser@gmail.com
    - password: adminuser1

- User accounts
    - email: test1@test.com, test2@gmail.com, test3-10@gmail.com
    - password: testuser1
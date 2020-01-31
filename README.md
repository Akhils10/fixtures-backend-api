# fixtures-backend-api
An API that serves the latest scores of fixtures of matches in a “Mock Premier League”

# Documentation

https://documenter.getpostman.com/view/10250758/SWTD6wPU

# Tools/Stack

- Node JS / Express JS
- Postgres
- Redis 
- POSTMAN
- Mocha, chai and supertest for testing

# Demo Server
https://fixtures-mock-api.herokuapp.com/


# Authentiation

Authentication for api endpoints using json web tokens (jwt)
Api access restricted to viewing for user accounts
Admin accounts have full access

# To run:

- npm install
- edit database config in config/config.js
- npm run migrate && npm run dev


## Run with Docker

- cd into folder root
- run "docker build ." to build Dockerfile
- run "docker-compose up"

If IP Address of docker container is not 192.168.99.100, ensure you set it to 192.168.99.100

# Dummy accounts

-  Admin account:
    - email: adminuser@gmail.com
    - password: adminuser1

- User accounts
    - email: test1@test.com, test2@gmail.com, test3-10@gmail.com
    - password: testuser1
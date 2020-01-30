const User = [
    {
      username: 'adminuser@gmail.com',
      email: 'adminuser@gmail.com',
      name: 'Admin User',
      role: 'adminUser',
      passwordSalt: '$2a$10$a8Fn1z5L7RHfOcxLVOEvxO',
      password: '$2a$10$a8Fn1z5L7RHfOcxLVOEvxO2iwaxTUFb4m7O./4dfrIY2d8ozYmsxa', 
    },
    {
      username: 'test1@test.com',
      email: 'test1@test.com',
      name: 'Test User',
      role: '',
      passwordSalt: '$2a$10$s4mhS06EOeKCATrdw/xkg.',
      password: '$2a$10$s4mhS06EOeKCATrdw/xkg.sLSXQ4br4QM0PnSvsH2ekst3hEXrD9i', 
    },
    {
      username: 'test2@test.com',
      email: 'test2@test.com',
      name: 'Test User',
      role: '',
      passwordSalt: '$2a$10$s4mhS06EOeKCATrdw/xkg.',
      password: '$2a$10$s4mhS06EOeKCATrdw/xkg.sLSXQ4br4QM0PnSvsH2ekst3hEXrD9i', 
    },
    {
      username: 'test3@test.com',
      email: 'test3@test.com',
      name: 'Test User',
      role: '',
      passwordSalt: '$2a$10$s4mhS06EOeKCATrdw/xkg.',
      password: '$2a$10$s4mhS06EOeKCATrdw/xkg.sLSXQ4br4QM0PnSvsH2ekst3hEXrD9i', 
    },
    {
      username: 'test4@test.com',
      email: 'test4@test.com',
      name: 'Test User',
      role: '',
      passwordSalt: '$2a$10$s4mhS06EOeKCATrdw/xkg.',
      password: '$2a$10$s4mhS06EOeKCATrdw/xkg.sLSXQ4br4QM0PnSvsH2ekst3hEXrD9i', 
    },
    {
      username: 'test5@test.com',
      email: 'test5@test.com',
      name: 'Test User',
      role: '',
      passwordSalt: '$2a$10$s4mhS06EOeKCATrdw/xkg.',
      password: '$2a$10$s4mhS06EOeKCATrdw/xkg.sLSXQ4br4QM0PnSvsH2ekst3hEXrD9i', 
    },
    {
      username: 'test6@test.com',
      email: 'test6@test.com',
      name: 'Test User',
      role: '',
      passwordSalt: '$2a$10$s4mhS06EOeKCATrdw/xkg.',
      password: '$2a$10$s4mhS06EOeKCATrdw/xkg.sLSXQ4br4QM0PnSvsH2ekst3hEXrD9i', 
    },
    {
      username: 'test7@test.com',
      email: 'test7@test.com',
      name: 'Test User',
      role: '',
      passwordSalt: '$2a$10$s4mhS06EOeKCATrdw/xkg.',
      password: '$2a$10$s4mhS06EOeKCATrdw/xkg.sLSXQ4br4QM0PnSvsH2ekst3hEXrD9i', 
    },
    {
      username: 'test8@test.com',
      email: 'test8@test.com',
      name: 'Test User',
      role: '',
      passwordSalt: '$2a$10$s4mhS06EOeKCATrdw/xkg.',
      password: '$2a$10$s4mhS06EOeKCATrdw/xkg.sLSXQ4br4QM0PnSvsH2ekst3hEXrD9i', 
    },
    {
      username: 'test9@test.com',
      email: 'test9@test.com',
      name: 'Test User',
      role: '',
      passwordSalt: '$2a$10$s4mhS06EOeKCATrdw/xkg.',
      password: '$2a$10$s4mhS06EOeKCATrdw/xkg.sLSXQ4br4QM0PnSvsH2ekst3hEXrD9i', 
    },
    {
      username: 'test10@test.com',
      email: 'test10@test.com',
      name: 'Test User',
      role: '',
      passwordSalt: '$2a$10$s4mhS06EOeKCATrdw/xkg.',
      password: '$2a$10$s4mhS06EOeKCATrdw/xkg.sLSXQ4br4QM0PnSvsH2ekst3hEXrD9i', 
    }
]

exports.seed = function(knex, Promise) {
    return knex('users').del()
      .then(function () {
        return knex('users').insert(User);
      });
  };
  
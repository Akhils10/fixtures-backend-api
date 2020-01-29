const User = [
    {
        username: 'admin@text.com',
        email: 'admin@text.com',
        name: 'Admin User',
        role: 'adminUser',
        passwordSalt: '$2a$10$f65FavlvvvWQnTBX4Nux1e',
        password: '$2a$10$f65FavlvvvWQnTBX4Nux1eBx96SvljjV4zEHbbWRJFq6gzCyeCZ8W', 
    },

]

exports.seed = function(knex, Promise) {
    return knex('users').del()
      .then(function () {
        return knex('users').insert(User);
      });
  };
  
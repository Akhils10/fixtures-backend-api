const knex = require('../config/config');

module.exports = {
    getAllUsers() {
        return knex('users');
      },
    getUser(id) {
        return knex('users').where('id', id).first();
    },
    getUserByEmail(email) {
        return knex('users').where({email});
    },
    create(user) {
        return knex('users').insert(user, '*');
    },
    update(id, user) {
        return knex('users').where('id', id).update(user, '*');
    },
    delete(id) {
        return knex('users').where('id', id).del();
    }
}
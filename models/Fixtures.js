const knex = require('../config/config');

module.exports = {
    getFixtures() {
        return knex('fixtures');
      },
    getFixture(id) {
        return knex('fixtures').where('id', id).first();
    },
    getPendingFixtures() {
        return knex('fixtures').where('status', 'pending');
    },
    getCompletedFixtures() {
        return knex('fixtures').where('status', 'completed');
    },
    create(fixture) {
        return knex('fixtures').insert(fixture, '*');
    },
    update(id, fixture) {
        return knex('fixtures').where('id', id).update(fixture, '*');
    },
    delete(id) {
        return knex('fixtures').where('id', id).del();
    }
}
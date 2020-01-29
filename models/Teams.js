const knex = require('../config/config');

module.exports = {
    getTeams() {
        return knex('teams');
      },
    getTeam(id) {
        return knex('teams').where('id', id).first();
    },
    create(team) {
        return knex('teams').insert(team, '*');
    },
    update(id, team) {
        return knex('teams').where('id', id).update(team, '*');
    },
    delete(id) {
        return knex('teams').where('id', id).del();
    }
}
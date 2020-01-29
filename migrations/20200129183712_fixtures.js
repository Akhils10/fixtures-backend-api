exports.up = function(knex) {
    return knex.schema.createTable('fixtures', (table) => {
        table.increments('id');
        table.string('home_team');
        table.string('away_team');
        table.string('match_time');
        table.string('link');
        table.string('status');
        table.timestamp('created_at').defaultTo(knex.fn.now())
    })
};

exports.down = function(knex) {
    return knex.schema.dropTable('fixtures');
};

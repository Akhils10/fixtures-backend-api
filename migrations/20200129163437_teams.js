exports.up = function(knex) {
    return knex.schema.createTable('teams', (table) => {
        table.increments('id');
        table.string('name');
        table.string('links');
        table.timestamp('created_at').defaultTo(knex.fn.now())
    })
};

exports.down = function(knex) {
    return knex.schema.dropTable('teams');
};

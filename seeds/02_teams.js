exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('teams').del()
    .then(function () {
        // Inserts seed entries
        return knex('teams').insert([
            {name: 'Juventus', 'links':'juventus001'},
        ]);
    });
};

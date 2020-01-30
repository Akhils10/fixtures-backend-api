exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('teams').del()
    .then(function () {
        // Inserts seed entries
        return knex('teams').insert([
            {name: 'Juventus', 'links':'juventus'},
            {name: 'Real madrid', 'links':'realmadrid'},
            {name: 'Liverppol', 'links':'liverpool'},
            {name: 'Chealsea', 'links':'chelsea'},
            {name: 'Benfica', 'links':'benfica'},
            {name: 'Barcelona FC', 'links':'barcelonafc'},
            {name: 'Inter milan', 'links':'intermilan'},
            {name: 'Lazio', 'links':'lazio'},
            {name: 'Valencia', 'links':'valencia'},
            {name: 'Arsenal', 'links':'arsenal'},
            {name: 'Manchester City', 'links':'mancity'},

        ]);
    });
};

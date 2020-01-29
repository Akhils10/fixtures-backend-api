exports.seed = function(knex) {
    // Deletes ALL existing entries
    return knex('fixtures').del()
      .then(function () {
          // Inserts seed entries
          return knex('fixtures').insert([
              {home_team: 'Juventus', away_team:'Inter Milan', match_time: '4pm, 20/02/2020', link: 'juvmil', status: 'pending'}
          ]);
      });
  };
  
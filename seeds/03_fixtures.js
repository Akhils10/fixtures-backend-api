exports.seed = function(knex) {
    // Deletes ALL existing entries
    return knex('fixtures').del()
      .then(function () {
          // Inserts seed entries
          return knex('fixtures').insert([
              {home_team: 'Juventus', away_team:'Inter Milan', team1_score: 2, team2_score: 1, match_time: '4pm, 20/02/2020', link: 'juvvsmil', status: 'completed'},
              {home_team: 'Lazio', away_team:'Real madrid', team1_score: '', team2_score:'', match_time: '4pm, 20/02/2020', link: 'lazvsmad', status: 'pending'},
              {home_team: 'Arsenal', away_team:'Liverpool', team1_score: 2, team2_score: 1, match_time: '9pm, 20/02/2020', link: 'arsvsliv', status: 'completed'},
              {home_team: 'Manchester city', away_team:'Chelsea', team1_score: 4, team2_score: 0, match_time: '4pm, 20/02/2020', link: 'manvsche', status: 'completed'},
              {home_team: 'Barcelona', away_team:'Valencia', team1_score: '', team2_score: '', match_time: '8pm, 21/02/2020', link: 'barvsval', status: 'pending'},
              {home_team: 'Benfica', away_team:'Lazio', team1_score: 2, team2_score: 1, match_time: '2pm, 20/02/2020', link: 'benvslaz', status: 'completed'},
              {home_team: 'Real Madrid', away_team:'Juventus', team1_score: '', team2_score: '', match_time: '2pm, 20/02/2020', link: 'madvsjuv', status: 'pending'},
              {home_team: 'Inter Milan', away_team:'Barcelona', team1_score: 2, team2_score: 3, match_time: '9pm, 18/02/2020', link: 'milvsbar', status: 'completed'},
              {home_team: 'Liverpool', away_team:'Benfica', team1_score: '', team2_score: '', match_time: '9pm, 19/02/2020', link: 'livvsben', status: 'pending'},
              {home_team: 'Chelsea', away_team:'Arsenal', team1_score: '', team2_score: '', match_time: '12pm, 26/02/2020', link: 'chevsars', status: 'pending'},
          ]);
      });
  };
  
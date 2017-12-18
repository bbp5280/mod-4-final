exports.seed = function(knex, Promise) {

  return knex('garage_items').del()

    .then(() => {
      return Promise.all([
        knex('garage_items').insert([
        {
          id:1,
          itemName: 'Rocking Horse',
          lingerReason: 'It is sentimental',
          cleanliness: 'Dusty'
        },
        {
          id:2,
          itemName: 'Stuffed Animals',
          lingerReason: 'I have no idea',
          cleanliness: 'Rancid'
        },
        {
          id:3,
          itemName: 'China',
          lingerReason: 'Why Not',
          cleanliness: 'Sparkling'
        }
      ])
          .then(() => console.log('Seeding All Good!'))
          .catch(error => console.log({ error }))
      ]);
    })
    .catch(error => console.log({ error }));
};

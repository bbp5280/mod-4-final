exports.seed = function(knex, Promise) {

  return knex('garage_items').del()

    .then(() => {
      return Promise.all([
        knex('garage_items').insert([
        {
          itemName: 'Rocking Horse',
          lingerReason: 'It is sentimental',
          cleanliness: 'Dusty'
        },
        {
          itemName: 'Stuffed Animals',
          lingerReason: 'I have no idea',
          cleanliness: 'Rancid'
        },
        {
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

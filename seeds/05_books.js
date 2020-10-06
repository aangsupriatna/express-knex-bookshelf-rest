
exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex('books').del()
    .then(function () {
      // Inserts seed entries
      return knex('books').insert([
        { id: 1, name: 'Book 1' },
        { id: 2, name: 'Book 2' },
        { id: 3, name: 'Book 3' },
      ]);
    });
};

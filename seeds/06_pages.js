
exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex('pages').del()
    .then(function () {
      // Inserts seed entries
      return knex('pages').insert([
        { id: 1, book_id: 1, name: 'Page 1' },
        { id: 2, book_id: 2, name: 'Page 2' },
        { id: 3, book_id: 3, name: 'Page 3' },
      ]);
    });
};

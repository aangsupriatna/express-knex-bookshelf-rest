
exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex('summaries').del()
    .then(function () {
      // Inserts seed entries
      return knex('summaries').insert([
        { id: 1, book_id: 1, name: 'Summary 1' },
        { id: 2, book_id: 2, name: 'Summary 2' },
        { id: 3, book_id: 3, name: 'Summary 3' },
      ]);
    });
};


exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex('books_users').del()
    .then(function () {
      // Inserts seed entries
      return knex('books_users').insert([
        { user_id: 1, book_id: 1 },
        { user_id: 2, book_id: 2 },
        { user_id: 3, book_id: 3 },
      ]);
    });
};

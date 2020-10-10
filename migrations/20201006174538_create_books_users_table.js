
exports.up = function (knex) {
    return knex.schema.createTable('books_users', function (table) {
        table.increments().primary()
        table.integer('user_id').unsigned().notNullable().references('users.id').onDelete('CASCADE')
        table.integer('book_id').unsigned().notNullable().references('books.id').onDelete('CASCADE')
        table.unique(['user_id', 'book_id'])
        table.timestamps(true, true)
    })
};

exports.down = function (knex) {
    return knex.schema.dropTableIfExists('books_users')
};

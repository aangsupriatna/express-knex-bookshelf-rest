
exports.up = function (knex) {
    return knex.schema.createTable('summaries', function (table) {
        table.increments('id').primary()
        table.string('name').notNullable()
        table.integer('book_id').unsigned().notNullable().references('books.id').onDelete('CASCADE')
        table.timestamps(true, true)
    })
};

exports.down = function (knex) {
    return knex.schema.dropTableIfExists('summaries')
};

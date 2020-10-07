
exports.up = function (knex) {
    return knex.schema.createTable('books', function (table) {
        table.increments('id').primary()
        table.string('name').notNullable()
        table.timestamps(true, true)
    })
};

exports.down = function (knex) {
    return knex.schema.dropTableIfExists('books')
};

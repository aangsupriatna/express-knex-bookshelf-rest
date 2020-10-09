
exports.up = function (knex) {
    return knex.schema.createTable('companies', function (table) {
        table.increments('id').primary()
        table.string('name').unique().notNullable()
        table.timestamps(true, true)
    })
};

exports.down = function (knex) {
    return knex.schema.dropTableIfExists('companies')
};

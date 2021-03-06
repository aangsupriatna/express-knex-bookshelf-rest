
exports.up = function (knex) {
    return knex.schema.createTable('projects', function (table) {
        table.increments('id').primary()
        table.integer('company_id').unsigned().references('companies.id').onDelete('CASCADE')
        table.string('name').unique().notNullable()
        table.timestamps(true, true)
    })
};

exports.down = function (knex) {
    return knex.schema.dropTableIfExists('projects')
};

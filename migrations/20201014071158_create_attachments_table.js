
exports.up = function (knex) {
    return knex.schema.createTable('attachments', function (table) {
        table.increments('id').primary()
        table.string('name').notNullable()
        table.integer('attachable_id').notNullable()
        table.string('attachable_type').notNullable()
        table.timestamps(true, true)
    })
};

exports.down = function (knex) {
    return knex.schema.dropTableIfExists('attachments')
};

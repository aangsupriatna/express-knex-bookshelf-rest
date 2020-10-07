
exports.up = function (knex) {
    return knex.schema.createTable('users_profile', function (table) {
        table.increments('id').primary();
        table.integer('user_id').unsigned().references('id').inTable('users').onDelete('CASCADE');
        table.string('fullname').notNullable();
        table.timestamps(true, true);
    })
};

exports.down = function (knex) {
    return knex.schema.dropTableIfExists('users_profile');
};

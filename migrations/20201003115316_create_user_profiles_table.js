
exports.up = function (knex) {
    return knex.schema.createTable('user_profiles', function (table) {
        table.increments('id').primary();
        table.integer('user_id').unsigned().references('id').inTable('users').onDelete('CASCADE').index();
        table.string('fullname').notNullable();
        table.timestamps(true, true);
    })
};

exports.down = function (knex) {
    return knex.schema.dropTable('user_profiles');
};

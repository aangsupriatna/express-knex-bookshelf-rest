
exports.seed = function (knex) {
    // Deletes ALL existing entries
    return knex('user_profiles').del()
        .then(function () {
            // Inserts seed entries
            return knex('user_profiles').insert([
                { id: 1, user_id: 1, fullname: 'John Snow' },
                { id: 2, user_id: 2, fullname: 'Jane Doe' },
                { id: 3, user_id: 3, fullname: 'Neil Armstrong' }
            ]);
        });
};


exports.seed = function (knex) {
    // Deletes ALL existing entries
    return knex('users_profile').del()
        .then(function () {
            // Inserts seed entries
            return knex('users_profile').insert([
                { id: 1, user_id: 1, fullname: 'John Snow' },
                { id: 2, user_id: 2, fullname: 'Jane Doe' },
                { id: 3, user_id: 3, fullname: 'Neil Armstrong' }
            ]);
        });
};

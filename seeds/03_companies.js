
exports.seed = function (knex) {
    // Deletes ALL existing entries
    return knex('companies').del()
        .then(function () {
            // Inserts seed entries
            return knex('companies').insert([
                { id: 1, name: 'Company 1' },
                { id: 2, name: 'Company 2' },
                { id: 3, name: 'Company 3' },
            ]);
        });
};

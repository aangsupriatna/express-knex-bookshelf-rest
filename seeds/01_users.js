const bcrypt = require('bcrypt');

exports.seed = function (knex) {
    // Deletes ALL existing entries
    const password = bcrypt.hashSync('secret', 10);
    return knex('users').del()
        .then(function () {
            // Inserts seed entries
            return knex('users').insert([
                { id: 1, username: 'john', email: 'john@gmail.com', role: 'admin', password: password },
                { id: 2, username: 'jane', email: 'jane@gmail.com', role: 'member', password: password },
                { id: 3, username: 'neil', email: 'neil@gmail.com', role: 'member', password: password }
            ]);
        });
};
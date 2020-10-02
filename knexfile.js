require('dotenv').config();

const connections = {
    client: 'mysql',
    connection: {
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASS,
        database: process.env.DB_NAME,
    },
    pool: {
        min: 2,
        max: 10
    },
    migrations: {
        directory: 'migrations',
    },
    seeds: {
        directory: 'seeds'
    }
};

module.exports = connections
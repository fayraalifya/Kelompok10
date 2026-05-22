const { Pool } = require('pg');

const pool = new Pool({

    host: 'localhost',
    user: 'postgres',
    password: 'fayra_07',
    database: 'sigweb',
    port: 5432

});

module.exports = pool;
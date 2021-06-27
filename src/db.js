const { Pool } = require('pg');
const { host, database, password } = require('pg/lib/defaults');
const { postgres } = require('../config');

// host, user, database, password, port = postgres;
const pool = new Pool(postgres);

module.exports = {
    query: (text, params, callback) => {
        return pool.query(text, params, callback);
    },
    connect: (err, client, done) => {
        return pool.connect(err, client, done);
    },
};

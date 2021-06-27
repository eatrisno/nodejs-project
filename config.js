const dotenv = require('dotenv');
dotenv.config();
// Single source to handle all the env vars
module.exports = {
    postgres:{
        host: process.env.PGHOST,
        user: process.env.PGUSER,
        database: process.env.PGDATABASE,
        password: process.env.PGPASSWORD,
        port: process.env.PGPORT,
    },
    twitter:{
        consumer_key: process.env.TWITTER_C_KEY,
        consumer_secret: process.env.TWITTER_C_SECRET,
        access_token_key: process.env.TWITTER_TOKEN_KEY,
        access_token_secret: process.env.TWITTER_TOKEN_SECRET     
    }
};
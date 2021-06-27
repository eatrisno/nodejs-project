const Twitter = require('twitter');
const { twitter } = require('../config');
// consumer_key, consumer_secret, access_token_key, access_token_secret = twitter;

const client = new Twitter(twitter);

module.exports = {
    search: (params) => {
        return client.get('search/tweets', params)
    },
    user_timeline: (params) => {
        return client.get('statuses/user_timeline', params)
    }
};
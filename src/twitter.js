const Twitter = require('twitter');
const { twitter } = require('../config');
const client = new Twitter(twitter);

module.exports = {
    search: (params) => {
        return client.get('search/tweets', params)
    },
    user_timeline: (params) => {
        return client.get('statuses/user_timeline', params)
        .catch(e =>{ 
            console.log('error:', e);
        })
    }
};
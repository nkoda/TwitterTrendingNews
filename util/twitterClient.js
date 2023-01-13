const twitter = require('twitter-api-client');
require('dotenv').config()

let _client;

const credentials = {
  apiKey: process.env.TWITTER_API_KEY,
  apiSecret: process.env.TWITTER_API_SECRET,
  accessToken: process.env.TWITTER_ACCESS_TOKEN,
  accessTokenSecret: process.env.TWITTER_ACCESS_TOKEN_SECRET,
  bearerToken : process.env.TWITTER_BEARER_TOKEN
};

const WOIED = 23424775;

const getTrends = async () => {
  try {
    if (!_client) {
      const twitterClient = new twitter.TwitterClient(credentials);
      _client = twitterClient;
    }
    const data = await _client.trends.trendsPlace({id: WOIED});
    return data[0]['trends'];
  } catch(err) {
    console.log('Could not retrieve trending tweets', err);
  };
};

const getTweetsFromTrends = async (topic) => {
  try {
    if (!_client) {
      const twitterClient = new twitter.TwitterClient(credentials);
      _client = twitterClient;
    }
    const data = await _client.tweetsV2.searchRecentTweets({query: topic});
    return data;
  } catch(err) {
    console.log('Could not retrieve data');
  };
};

const getClient = () => {
  if (_client) {
      return _client;
  }
  throw 'Twitter Client not found';
}

exports.getClient = getClient;
exports.getTweetsFromTrends = getTweetsFromTrends;
exports.getTrends = getTrends;

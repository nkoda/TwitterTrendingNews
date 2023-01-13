
const twitterClient = require('../util/twitterClient');
const tweetProcessor = require('./tweets');
const getDb = require('../util/database').getDb;
const getDate = require('../util/date');

const processTrends = () => {
    twitterClient.getTrends(
        ).then( trendsData => {
            trendsData.forEach(async data => {
                const trend = new exports.Trend(
                    data['name'],
                    data['url'],
                    data['promoted_content'],
                    data['query'],
                    data['tweet_volume']
                );
                await tweetProcessor.process(trend.name)
                    .then((result) => {
                        trend.addTweets(result);
                        trend.save();
                    })
                    .catch((err) => {
                        console.log('Failed to attach tweets to trend')
                    });
            })
        })
        .catch(err => {
            console.log(`Could not process trends`);
            console.log(err);
        });
}

class Trend {
    constructor(name, url, promoted_content, query, tweet_volume, tweets = [], date = getDate()) {
        this.name = name;
        this.url = url;
        this.promoted_content = promoted_content;
        this.query = query; 
        this.tweet_volume = tweet_volume;

        this.tweets = tweets;
        this.date = date;
    }

    save() {
        const db = getDb();
        return db.collection('trends')
            .updateOne({name: this.name}, {$set: this}, {upsert:true})
            .then(result => {
                // console.log(result);
            })
            .catch(err => {
                console.log(err);
            });
    }

    static fetchAllByDate(queryDate) {
        const db = getDb();
        return db
            .collection('trends')
            .find({date: queryDate})
            .toArray()
            .then(trends => {
                // console.log(trends);
                const trendsObj = [];
                trends.forEach((trend) => {
                    trendsObj.push(new Trend(
                        trend['name'],
                        trend['url'],
                        trend['promoted_content'],
                        trend['query'],
                        trend['tweet_volume'],
                        trend['tweets'], 
                        trend['date']
                        ));
                })
                return trendsObj;
            })
            .catch(err => {
                console.log(err);
            });
    }

    static fetchAll() {
        const db = getDb();
        return db
            .collection('trends')
            .find()
            .toArray()
            .then(trends => {
                const trendsObj = [];
                trends.forEach((trend) => {
                    trendsObj.push(new Trend(
                        trend['name'],
                        trend['url'],
                        trend['promoted_content'],
                        trend['query'],
                        trend['tweet_volume'],
                        trend['tweets']
                        ));
                })
                return trendsObj;
            })
            .catch(err => {
                console.log(err);
            });
    }

    static fetchTrend(trend) {
        return db.collection('trends').findOne({name: trend});
    }

    addTweet(tweet) {
        this.tweets.push(tweet);
    }

    addTweets(tweets) {
        this.tweets = tweets;
    }

    fetchAllText() {
        const tweets = this.tweets;
        const tweetTexts = [];
        tweets.forEach(tweet => {
            tweetTexts.push(tweet.text);
        });
        return tweetTexts;
    }

    fetchAllTweets() {
        const tweets = this.tweets;
        return tweets;
    }
}


exports.Trend = Trend;
exports.processTrends = processTrends;

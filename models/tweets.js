const twitterClient = require('../util/twitterClient');
const getDb = require('../util/database').getDb;

const process = (trendName) => {
    return twitterClient
        .getTweetsFromTrends(trendName)
        .then(res => {
            const data = res['data'];
            const meta = res['meta'];
            const tweets = [];
            data.forEach(tweetData => {
                const tweet = new Tweet(
                    tweetData['id'],
                    tweetData['text'],
                    trendName
                    );
                tweet
                    .save()
                    .then(() => {tweets.push(tweet);});
            });
            return tweets;
        })
        .catch(err => {
            console.log(`Could not process ${trendName}'s tweets`);
        });
}



class Tweet {
    constructor(id, text, trend) {
        this.id = id;
        this.text = text;
        this.trend = trend;
    }

    save() {
        const db = getDb();
        return db.collection('tweets')
            .updateOne({id: this.id}, {$set: this}, { upsert: true })
            .then(result => {
                console.log(result);
            })
            .catch(err => {
                console.log(err);
            });
    }

    static fetchAll() {
        const db = getDb();
        return db
            .collection('tweets')
            .find()
            .toArray()
            .then(trends => {
                return trends;
            })
            .catch(err => {
                console.log(err);
            });
    }

    static fetchTweet(tweet) {
        const db = getDb();
        return db
            .collection('tweets')
            .findOne({name: tweet})
            .then(result => {
                console.log(result)
                return result;
            });
    }

    fetchText() {
        return this.text;
    }

    fetchTrend() {
        return this.trend;
    }
}

exports.Tweet = Tweet;
exports.process = process;
const writeReport = require('../util/openAIClient').generateReport;
const { Trend, processTrends} = require('./trends');
const getDb = require('../util/database').getDb;
const getDate = require('../util/date');

const generateReports = () => {
    processTrends();
    Trend.fetchAllByDate(getDate)
        .then(trends => {
            trends.forEach(async currTrend => {
                let body = ''
                try {
                    body = await writeReport(currTrend.fetchAllText());
                    new Report(currTrend.name, body, getDate())
                        .save();
                } catch (error) {
                    console.log(`could not report on ${currTrend.name}`);
                }
            })
        })
};


class Report {
    constructor(trend, body, date) {
        this.trend = trend;
        this.body = body;
        this.date = date;
    }

    save() {
        const db = getDb();
        return db.collection('reports')
            .updateOne({trend: this.trend}, {$set: this}, {upsert:true})
            .then(result => {
                console.log("Successfully uploaded");
            })
            .catch(err => {
                console.log(err);
            });
    }

    static fetchAll() {
        const db = getDb();
        return db
            .collection('reports')
            .find()
            .toArray()
            .then(result => {
                console.log(result)
                return result;
            })
            .catch(err => {
                console.log(err);
            });
    }
}


exports.Report = Report;
exports.generateReports = generateReports;
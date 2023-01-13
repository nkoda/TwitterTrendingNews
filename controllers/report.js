const twitterConnect = require('../util/twitterClient');
const reportsModel = require('../models/reports');
const getDate = require('../util/date');

exports.getTwitter = async (req, res, next) => {
    const trends = await twitterConnect.getTrends();
    res.status(200).json({
        test: 'okay',
        data: trends
    });
};

exports.getLatestReports = async (req, res, next) => {
    await reportsModel.generateReports();
    const results = await reportsModel.Report.fetchAllByDate(getDate());
    res.status(200).json(results);
}

exports.getReports = async (req, res, next) => {
    const results = await reportsModel.Report.fetchAll();
    res.status(200).json(results);
}


exports.datastore = function () {
    const Sequelize = require('sequelize');
    require('dotenv').config();

    const Instance = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASS, {
        host: process.env.DB_HOST,
        dialect: 'mysql'
    });

    Instance.authenticate()
        .then(() => {
            console.log('Connection has been established successfully.');
        })
        .catch(err => {
            console.error('Unable to connect to the database:', err);
        });

    return {
        Values: Instance.import(__dirname + '/models/Values'),
        Trusts: Instance.import(__dirname + "/models/Trusts"),
        TrustMetrics: Instance.import(__dirname + "/models/TrustMetrics"),
        TrustPerformance: Instance.import(__dirname + "/models/TrustPerformance")
    }
};

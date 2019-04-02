const Sequelize = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASS, {
    host: process.env.DB_HOST,
    dialect: 'mysql'
});

sequelize.authenticate()
    .then(() => {
        console.log('Connection has been established successfully.');
    })
    .catch(err => {
        console.error('Unable to connect to the database:', err);
    });

const Values = sequelize.import(__dirname + '/models/Values');
const Trusts = sequelize.import(__dirname + "/models/Trusts");
const TrustMetrics = sequelize.import(__dirname + "/models/TrustMetrics");
const TrustPerformance = sequelize.import(__dirname + "/models/TrustPerformance");

// Values.findAll({ attributes: ['Id', 'Name'] }).then(value => console.log(value));
// Values.findOne({ raw: true, where: { Id: 1 }, attributes: ['Id', 'Name'] }).then(value => console.log(value));
Trusts.findAll({raw: true, attributes: ['Id', 'Code', 'Name']}).then(values => {
    console.log(values.map(value => value.Name));
});

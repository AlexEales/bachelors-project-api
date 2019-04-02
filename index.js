const datastore = require('./datastore');
const knowledge = require('./knowledge');
const express = require('express');
require('dotenv').config();

const app = express();
app.use(express.json());

console.log(`Env variables: Port = ${process.env.PORT} Host = ${process.env.DB_HOST} Db = ${process.env.DB_NAME} 
    User = ${process.env.DB_USER} Pass = ${process.env.DB_PASS}`);

app.get('/trusts', function (req, res) {
    datastore.datastore().Trusts.findAll({raw: true, attributes: ['Id', 'Code', 'Name']}).then(values => {
        res.send(values);
    });
});

app.post('/dialogflow', function (req, res) {
    console.log(req.body);
    const intent = req.body.queryResult.intent.displayName;
    const entities = req.body.queryResult.parameters;
    res.send({
        fulfillmentText: knowledge.query(intent, entities)
    });
});

app.listen(process.env.PORT, () => console.log('Example app listening on port 3000.'));

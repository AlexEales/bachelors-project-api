// const datastore = require('./datastore');
const express = require('express');
const app = express();
app.use(express.json());

console.log(`Env variables: Host = ${process.env.DB_HOST} Db = ${process.env.DB_NAME} User = ${process.env.DB_USER} Pass = ${process.env.DB_PASS}`)

// let trusts = [];
// datastore.datastore().Trusts.findAll({raw: true, attributes: ['Id', 'Code', 'Name']}).then(values => {
//     trusts = values;
// });
//
// app.get('/trusts', (req, res) => res.send(trusts));

app.post('/dialogflow', function (req, res) {
    console.log(req.body);
    res.send({
        fulfillmentText: 'Hi from the API!'
    });
});

app.listen(3000, () => console.log('Example app listening on port 3000.'));

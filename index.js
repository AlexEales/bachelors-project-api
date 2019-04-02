const datastore = require('./datastore');
const express = require('express');
const app = express();

let trusts = [];
datastore.datastore().Trusts.findAll({raw: true, attributes: ['Id', 'Code', 'Name']}).then(values => {
    trusts = values;
});

app.get('/trusts', (req, res) => res.send(trusts));

app.listen(3000, () => console.log('Example app listening on port 3000.'));

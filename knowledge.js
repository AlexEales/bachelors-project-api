const datastore = require('./datastore');
const DEFAULT_RESPONSE = `Sorry, I couldn't find anything to help with that!`;

// Example:
// let trusts = [];
// datastore.datastore().Trusts.findAll({raw: true, attributes: ['Id', 'Code', 'Name']}).then(values => {
//     trusts = values;
// });
//
// app.get('/trusts', (req, res) => res.send(trusts));

exports.query = function (intent, entities) {
    console.log(`Querying the graph for mapping: ${Object.keys(entities)} -> ${intent}`);
    return DEFAULT_RESPONSE;
};

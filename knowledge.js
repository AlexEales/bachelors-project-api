const datastore = require('./datastore');
const DEFAULT_RESPONSE = `Sorry, I couldn't find anything to help with that!`;
const graph = {
    ['geo-city']: {
        ServiceProvider: servicesNearLoc
    }
};

function servicesNearLoc(params) {
    return `Returning services near: ${params['geo-city']}`;
}

// Example:
// let trusts = [];
// datastore.datastore().Trusts.findAll({raw: true, attributes: ['Id', 'Code', 'Name']}).then(values => {
//     trusts = values;
// });
//
// app.get('/trusts', (req, res) => res.send(trusts));

exports.query = function (intent, entities) {
    console.log(`Querying the graph for mapping: ${Object.keys(entities)} -> ${intent}`);
    const inputs = Object.keys(entities);
    if (inputs in graph) {
        if (intent in graph[inputs]) {
            console.log(`Found transform: ${graph[inputs][intent]}`);
            return graph[inputs][intent](entities);
        }
    }
    return DEFAULT_RESPONSE;
};

const datastore = require('./datastore');
const maps = require('./maps');
const DEFAULT_RESPONSE = `Sorry, I couldn't find anything to help with that!`;
const graph = {
    ['geo-city']: {
        ServiceProvider: servicesNearLoc
    }
};

// Populate the cache on start-up.
maps.populateCache();

// Save the maps cache every 5 mins.
setInterval(function () {
    maps.saveCache();
}, 300000);

// Make sure the cache saves before shutdown.
process.on('exit', maps.saveCache);
process.on('SIGINT', maps.saveCache);
process.on('SIGUSR1', maps.saveCache);
process.on('SIGUSR2', maps.saveCache);
process.on('uncaughtException', maps.saveCache);

let trusts = [];
datastore.datastore().Trusts.findAll({raw: true, attributes: ['Name']}).then(values => {
    trusts = values.map(value => value.Name);
    // console.log(trusts);
});

// TODO: Need to make methods for transforms as well as make a knowledge base for DF of common questions.
function servicesNearLoc(params) {
    maps.distanceMatrix(params['geo-city'], trusts).then(results => console.log(results));
    return `Returning services near: ${params['geo-city']}`;
}

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

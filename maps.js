const axios = require('axios');
const fs = require('fs');
require('dotenv').config();
const BASE_URL = 'https://maps.googleapis.com/maps/api/distancematrix/json?units=imperial&';

let cache = {};

exports.populateCache = function () {
    console.log('Populating Cache...');
    fs.readFile('distanceCache.json', (err, data) => {
        if (err) {
            console.error(err);
            return;
        }
        cache = JSON.parse(data.toString());
    })
};

exports.saveCache = function () {
    console.log('Saving Cache...');
    fs.writeFile('distanceCache.json', JSON.stringify(cache), (err => {
        if (err) {
            console.error(err);
            return;
        }
        console.log('Cache Saved!');
    }));
};

exports.distanceMatrix = function (source, destinations) {
    // Check the cache first.
    if (source in cache) {
        console.log('Results found in cache!');
        // Get the cache results.
        return new Promise(resolve => resolve(cache[source]));
    }
    // If we haven't dealt with this location before then do a lookup and save the answer.
    let uri = BASE_URL + `origins=${source}&destinations=${destinations.join('|')}&key=${process.env.MAPS_API_KEY}`;
    return axios.get(uri)
        .then(response => {
            // Need to map to the names and distances first.
            let distances = response.data.rows[0].elements.map(elem => elem.distance);
            let results = [];
            for (let i = 0; i < distances.length; i++) {
                if (distances[i] === undefined) {
                    continue;
                }
                if (distances[i].value < 80000) {
                    results.push({
                        name: destinations[i],
                        distance: distances[i]
                    });
                }
            }
            results.sort((a, b) => {
                if (a.distance.value < b.distance.value) return -1;
                else if (a.distance.value > b.distance.value) return 1;
                else return 0;
            });
            // Store results in the cache.
            cache[source] = results;
            // Return the results in promise.
            return results;
        })
        .catch(error => {
            console.log(error);
        });
};

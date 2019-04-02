const axios = require('axios');
require('dotenv').config();
const BASE_URL = 'https://maps.googleapis.com/maps/api/distancematrix/json?units=imperial&';

// TODO: Make some kind of caching system that saves results in a file between to save API calls.
exports.distanceMatrix = function (source, destinations) {
    let uri = BASE_URL + `origins=${source}&destinations=${destinations.join('|')}&key=${process.env.MAPS_API_KEY}`;
    axios.get(uri)
        .then(response => {
            console.log(JSON.stringify(response.data.rows[0].elements[0].filter(element => element.distance.value < 40000)));
        })
        .catch(error => {
            console.log(error);
        })
};

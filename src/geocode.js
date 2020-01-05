const request = require('request');

const geocode = (address, callback) => {
    const urlMapbox = "https://api.mapbox.com/geocoding/v5/mapbox.places/" +
        encodeURIComponent(address) +
        ".json?access_token=pk.eyJ1IjoibWVydGVydHVyYW4iLCJhIjoiY2s0cmQ4eTd6MG44bDNkcDk4bDllZHh5ayJ9.2eOvPS03pZpvpKAGJ7hVUQ&limit=1";

    request({
        url: urlMapbox,
        json: true
    }, (error, {body}) => {
        if (error) {
            callback(error, undefined);
        } else if (body.features.length === 0) {
            callback("There is no location with address", undefined);
        } else {
            const lat = body.features[0].center[1];
            const lon = body.features[0].center[0];
            const location = body.features[0].place_name;
            callback(undefined, {
                lat,
                lon,
                location
            });
        }
    });
};

module.exports = {
    geocode: geocode
};
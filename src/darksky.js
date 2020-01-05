const request = require('request');


const forecast = (lat, lon, callback) => {
    const urlDarksky = 'https://api.darksky.net/forecast/193816323a835a939d57088c982d165e/'+lat+','+lon+'?units=si';

    request({
        url: urlDarksky,
        json: true
    }, (error, {body}) => {
        if (error) {
            callback(error, undefined);
        } else if (body.error) {
            callback("There is error in response: " + body.error, undefined);
        } else {
            callback(undefined, body.daily.data[0].summary + " " + body.currently.temperature, body.currently.precipProbability);
        }
    
    });
};

module.exports = {
    forecast: forecast
};
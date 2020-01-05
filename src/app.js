const path = require('path');
const express = require('express');
const hbs = require('hbs');
const geocode = require('./geocode');
const darksky = require('./darksky');

const app = express();
const port = process.env.PORT || 3000;

const publicDir = path.join(__dirname, '../public');
app.use(express.static(publicDir));

const viewsDir = path.join(__dirname, '../templates/views');
const partialsDir = path.join(__dirname, '../templates/partials');
app.set('view engine', 'hbs');
app.set('views', viewsDir);
hbs.registerPartials(partialsDir);

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Merter'
    });
});

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About',
        name: 'Merter'
    });
});

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        name: 'Merter'
    });
});

app.get('/weather', (req, res) => {

    if (!req.query.address) {
        res.send({ error: "Please provide an address" });
    } else {
        geocode.geocode(req.query.address, (error, { lat, lon, location } = {}) => {
            if (error) {
                res.send({ error });
            } else {
                darksky.forecast(lat, lon, (error, data2) => {
                    if (error) {
                        res.send({ error });
                    }

                    res.send({
                        location: location,
                        address: req.query.address,
                        forecast: data2
                    });

                });
            }
        });
    }
});


app.get('*', (req, res) => {
    res.render('404', {
        title: '404 page',
        name: 'Merter',
        error: 'cannot find'
    });
});

app.listen(port, () => console.log("STARTED at " + port));
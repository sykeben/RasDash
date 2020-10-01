// Import libraries.
const express = require('express');
const si = require('systeminformation');

// Get server config.
const serverConfig = require('../config/server.json');

// Initialize express application.
const app = express();
app.set('views', 'views');
app.set('view engine', 'ejs');

// Automatic temp converter.
function tempConvert(celcius) {
    if (serverConfig.units.temp == 'c') {
        return celcius;
    } else if (serverConfig.units.temp == 'f') {
        return (celcius * 1.8) + 32.0;
    } else {
        return -1;
    }
}

// Setup backend.
app.get('/api/get', async (req, res) => {

    res.json({

        // Value units.
        units: {
            temp: serverConfig.units.temp.toUpperCase()
        },

        // CPU.
        cpu: {
            temp: Math.round(tempConvert((await si.cpuTemperature()).main)),
            load: Math.round((await si.currentLoad()).currentload)
        }

    });

});

// Setup frontend.
app.use(express.static('public'));
app.get('/', (req, res) => res.redirect('/dashboard'));
app.get('/dashboard', (req, res) => res.render('dashboard'));

// Start server.
app.listen(serverConfig.port, () => {
    console.log(`Server started on port ${serverConfig.port}`);
});

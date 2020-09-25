// Import libraries.
const express = require('express');
const si = require('systeminformation');

// Get server config.
const serverConfig = require('../config/server.json');

// Initialize express application.
const app = express();
app.set('views', 'views');
app.set('view engine', 'ejs');

// Setup backend.
app.get('/api/get', async (req, res) => {

    res.json({

        cpu: {
            load: Math.round((await si.currentLoad()).currentload),
            temp: (await si.cpuTemperature()).main
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

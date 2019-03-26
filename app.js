////////////////////////////////////////////
// RASDASH SERVER (C)2019: Benjamin Sykes //
////////////////////////////////////////////

// Config
const config = require('./config.json');

// Import libraries.
const express = require('express')
const path = require('path')
const logger = require('./logger.js')

// Initialize the API.
const api = require('./api.js')

// Initialize the application.
logger.info('Initializing application...')
const appPort = config.port;
const app = express()
app.use(express.static(path.join(__dirname, 'public')))
app.use('/api', api)
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')

// Configure application requests.
logger.info('Configuring application requests...')
app.get('/', (req, res) => res.render('pages/index'))
app.get('/about', (req, res) => res.render('pages/about'))

// Start server.
logger.info('Starting server on port ' + appPort.toString() + '...')
app.listen(appPort, () => logger.state('Server started.'))

// Initialize console commands.
const cli = require('./cli.js')
cli.initCli()

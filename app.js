////////////////////////////////////////////
// RASDASH SERVER (C)2019: Benjamin Sykes //
////////////////////////////////////////////

// Import config. (Thanks @Ernie3 for adding this!)
const config = require('./config.json')

// Import libraries.
const express = require('express')
const path = require('path')
const logger = require('./logger.js')

// Get argument.
var argsPresent = false; if (process.argv.length >= 3) argsPresent = true
let argument; if (argsPresent) argument = process.argv[2]

// Process argument.
var allowRun = false; var serviceMode = false
const argMessage = 'Arguments are help, normal, service, & config.'
if (argsPresent) {
	if (argument === 'help') {
		// Print help.
		logger.info('node ' + process.argv[1] + ' [option]\n\nnormal    Start RasDash in normal mode.\nservice   Start RasDash in service mode (disables console commands).\nconfig    Print contents of the configuration file (config.json).')
	} else if (argument === 'normal') {
		// Run in normal mode.
		allowRun = true
		logger.state('Starting RasDash in normal mode.')
	} else if (argument === 'service') {
		// Run in service mode.
		allowRun = true; serviceMode = true
		logger.state('Starting RasDash in service mode.')
	} else if (argument === 'config') {
		// Print out config.
		logger.info('Contents of configuration file (config.json):\n' + JSON.stringify(config))
	} else {
		// Invalid argument.
		logger.fatal('Invalid argument, cannot run.\n' + argMessage)
	}
} else {
	// No argument.
	logger.fatal('No argument present, cannot run.\n' + argMessage)
}

// Run if told to.
if (allowRun) {
	
	// Initialize the API.
	const api = require('./api.js')

	// Initialize the application.
	logger.info('Initializing application...')
	const appPort = config.port
	const app = express()
	app.use(express.static(path.join(__dirname, 'public')))
	app.use('/api', api)
	app.set('views', path.join(__dirname, 'views'))
	app.set('view engine', 'ejs')

	// Configure application requests.
	logger.info('Configuring application requests...')
	app.get('/', (req, res) => res.redirect('/dash/0'))
	app.get('/dash/0', (req, res) => res.render('pages/dash_0'))
	app.get('/dash/1', (req, res) => res.render('pages/dash_1'))
	app.get('/about', (req, res) => res.render('pages/about'))

	// Start server.
	logger.info('Starting server on port ' + appPort.toString() + '...')
	app.listen(appPort, () => logger.state('Server started.'))

	// Initialize console commands if running normally.
	if (!serviceMode) {
		const cli = require('./cli.js')
		cli.initCli()
	}

}

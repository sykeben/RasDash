////////////////////////////////////////////
// RASDASH SERVER (C)2019: Benjamin Sykes //
////////////////////////////////////////////

// Import libraries.
const express = require('express')
const path = require('path')
const logger = require('./logger.js')
const hhmmss = require('./hhmmss.js')

// Initialize the API.
const api = require('./api.js')

// Initialize the application.
logger.info('Initializing application...')
const appPort = 80
const app = express()
app.use(express.static(path.join(__dirname, 'public')))
app.use('/api', api)
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')

// Configure application requests.
logger.info('Configuring application requests...')
app.get('/', (req, res) => res.render('pages/index'))
app.get('/setup', (req, res) => res.render('pages/setup'))

// Start server.
logger.info('Starting server on port ' + appPort.toString() + '...')
app.listen(appPort, () => logger.state('Server started.'))

// Initialize console commands.
logger.info('Initializing console commands...')
process.stdin.resume()
process.stdin.setEncoding('utf8')
process.stdin.on('data', function (text) {
  var command = text.trim()
  if (command[0] === '/') {
    
    // Command: /help
    if (command === '/help') {
      logger.data('COMMANDS: help quit config uptime')
      
    // Command: /quit
    } else if (command === '/quit') {
      logger.warn('Quit requested, exiting now...')
      process.exit()
    
    // Command: /config
    } else if (command === '/config') {
      logger.data('CONFIG: App on port ' + appPort.toString() + '.')
      
    // Command: /uptime
    } else if (command === '/uptime') {
      logger.data('UPTIME: ' + hhmmss.toHHMMSS(process.uptime()+""))
      
    // Invalid command.
    } else {
      logger.error('Invalid command.')
    }
    
  // No command.
  } else {
    logger.data('ECHO: ' + command)
  }
})
logger.state('Console ready, run \"/help\" to list commands.')

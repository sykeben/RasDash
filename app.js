// Import libraries.
const express = require('express')
const path = require('path')
const logger = require('./logger.js')
const hhmmss = require('./hhmmss.js')
const opn = require('opn')

// Initialize the application.
logger.info('Initializing application server...')
const PORT = 80
const app = express()
app.use(express.static(path.join(__dirname, 'public')))
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')

// Configure application requests.
logger.info('Configuring application requests...')
app.get('/', (req, res) => res.render('pages/index'))

// Start application.
logger.info('Starting application on port '+PORT.toString()+'...')
app.listen(PORT, () => logger.info('Application started.'))

// Initialize console commands.
logger.info('Initializing console commands...')
process.stdin.resume()
process.stdin.setEncoding('utf8')
process.stdin.on('data', function (text) {
  var command = text.trim()
  if (command[0] === '/') {
    
    // Command: /help
    if (command === '/help') {
      logger.data('COMMANDS: help open quit config uptime')
    
    // Command: /open
    } else if (command === '/open') {
      try {
        opn('http://localhost:' + PORT.toString(), {app: 'chromium'})
      } catch {
        opn('http://localhost:' + PORT.toString())
      }
      
    // Command: /quit
    } else if (command === '/quit') {
      logger.warn('Quit requested, exiting now...')
      process.exit()
    
    // Command: /config
    } else if (command === '/config') {
      logger.data('CONFIG: Port='+PORT.toString())
      
    // Command: /uptime
    } else if (command === '/uptime') {
      logger.data('UPTIME: '+hhmmss.toHHMMSS(process.uptime()+""))
      
    // Invalid command.
    } else {
      logger.error('Invalid command.')
    }
    
  // No command.
  } else {
    logger.data('ECHO: '+command)
  }
})
logger.info('Console ready, run \"/help\" to list commands.')

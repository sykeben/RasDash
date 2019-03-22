// Import libraries.
const express = require('express')
const path = require('path')
const logger = require('./logger.js')
const hhmmss = require('./hhmmss.js')

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
    if (command === '/help') {
      logger.data('COMMANDS: help quit config uptime')
    } else if (command === '/quit') {
      logger.warn('Quit requested, exiting now...')
      process.exit()
    } else if (command === '/config') {
      logger.data('CONFIG: Port='+PORT.toString())
    } else if (command === '/uptime') {
      logger.data('UPTIME: '+hhmmss.toHHMMSS(process.uptime()+""))
    } else {
      logger.error('Invalid command.')
    }
  } else {
    logger.data('ECHO: '+command)
  }
})
logger.info('Console ready, run \"/help\" to list commands.')

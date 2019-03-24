////////////////////////////////////////////
// RASDASH SERVER (C)2019: Benjamin Sykes //
////////////////////////////////////////////

// Import libraries.
const express = require('express')
const path = require('path')
const logger = require('./logger.js')
const hhmmss = require('./hhmmss.js')
const si = require('systeminformation')

// Initialize the API.
logger.info('Initializing API...')
const api = express()
api.on('mount', (parent) => logger.state('API mounted to application.'))

// Configure API requests.
logger.info('Configuring API requests...')
const siError = 'error getting data'

// API requests: status.
api.get('/online', function(req, res) { // Server Status (online)
  res.status(200).send('true')
})

// API requests: hardware.
api.get('/hw/model', function(req, res) { // Device Model (hw/model)
  si.system()
    .then(data => res.send('\"' + data.model.toString() + '\"'))
    .catch(error => res.status(404).send(siError))
})

// API requests: CPU.
api.get('/cpu/temp', function(req, res) { // CPU Temperature in C (cpu/temp)
  si.cpuTemperature()
    .then(data => res.send(data.main.toString()))
    .catch(error => res.status(404).send(siError))
})
api.get('/cpu/usage', function(req, res) { // CPU Usage % (cpu/usage)
  si.currentLoad()
    .then(data => res.send(data.currentload.toString()))
    .catch(error => res.status(404).send(siError))
})

// API requests: file system.
api.get('/fs/:id/usage', function(req, res) { // File System Usage % (fs/[id]/usage)
  si.fsSize()
    .then(data => res.send(data[parseInt(req.params.id)].use.toString()))
    .catch(error => res.status(404).send(siError))
})
api.get('/fs/:id/used', function(req, res) { // Used GB in File System (fs/[id]/used)
  si.fsSize()
    .then(data => res.send((data[parseInt(req.params.id)].used/(1024*1024*1024)).toString()))
    .catch(error => res.status(404).send(siError))
})
api.get('/fs/:id/total', function(req, res) { // Total GB in File System (fs/[id]/used)
  si.fsSize()
    .then(data => res.send((data[parseInt(req.params.id)].size/(1024*1024*1024)).toString()))
    .catch(error => res.status(404).send(siError))
})

// API requests: RAM.
api.get('/ram/usage', function(req, res) { // RAM Usage % (ram/usage)
  si.mem()
    .then(data => res.send(((data.used/data.total)*100).toString()))
    .catch(error => res.status(404).send(siError))
})
api.get('/ram/used', function(req, res) { // Used RAM in MB (ram/used)
  si.mem()
    .then(data => res.send((data.used/(1024*1024)).toString()))
    .catch(error => res.status(404).send(siError))
})
api.get('/ram/total', function(req, res) { // Total RAM in MB (ram/total)
  si.mem()
    .then(data => res.send((data.total/(1024*1024)).toString()))
    .catch(error => res.status(404).send(siError))
})

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

///////////////////////////////////////////
// RASDASH API SERVER (C)2019: Ben Sykes //
///////////////////////////////////////////

// Get version. (Thanks @Ernie3 for adding this!)
const serverVersion = require('./package.json').version

// Import libraries.
const express = require('express')
const path = require('path')
const logger = require('./logger.js')
const si = require('systeminformation')

// Initialize the API.
logger.info('Initializing API...')
const api = express()
api.on('mount', (parent) => logger.state('API mounted to application.'))

// Configure API requests.
logger.info('Configuring API requests...')
const siError = 'error getting data'

// API requests: Info.
api.get('/info/online', function(req, res) { // Server Status (info/online)
  res.status(200).send('true')
})
api.get('/info/version', function(req, res) { // Server Version (info/version)
  res.send('\"' + serverVersion + '\"')
})

// API requests: System.
api.get('/sys/model', function(req, res) { // Device Model (sys/model)
  si.system()
    .then(data => res.send('\"' + data.model.toString() + '\"'))
    .catch(error => res.status(404).send(siError))
})
api.get('/sys/os', function(req, res) { // Device OS (sys/os)
  si.osInfo()
    .then(data => res.send('\"' + data.platform + ' (' + data.distro + ')\"'))
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

// API requests: File system.
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

// API requests: Network.
api.get('/network/transmit/:interface', function(req, res) {
  let interface = req.params.interface

  si.networkStats(interface)
    .then(data => res.send((data[0].tx_sec / 125) + '')) // Total data trasmitted in kilobits/second (network/transmit/[interface])
    .catch(error => res.status(404).send(siError))
})
api.get('/network/receive/:interface', function(req, res) {
  let interface = req.params.interface
  
  si.networkStats(interface)
    .then(data => res.send((data[0].rx_sec / 125) + '')) // Total data received in kilobits/second (network/recieve/[interface])
    .catch(error => res.status(404).send(siError))
})

// API Requests: Uptime
api.get('/uptime', function(req, res) {
  res.send(process.uptime() + '') // System uptime (uptime)
})

// Export the API to what's using it.
module.exports = api

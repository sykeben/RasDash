// Import server config.
const serverConfig = require('./config.json')

// Import libraries.
const spawn = require('child_process').spawn
const logger = require('./logger.js')
const http = require('http')

// Spawn the server child process for testing.
logger.state('Spawning server process...')
const child = spawn('node', ['app.js', 'normal'])
var readyToQuit = false
logger.info('Server process spawned.')

// Configure server events.
logger.info('Configuring server events...')
child.on('close', (code) => { // Closing.
    if (code != 0) logger.error('Server exited with code ' + code + '.')
    else logger.state('Server exited with code 0.')
    child.stdin.end()
    if (readyToQuit) {
        if (!testOk) process.exit(1)
        else process.exit()
    }
})

// Prepare to test the web server and API.
logger.info('Prepping to test...')
const webBase = 'http://localhost:'+ serverConfig.port.toString()
const apiBase = webBase + '/api'
var testOk = true
var brokenList = []

// Page tester.
function testPage(url , name) {
    http.get(webBase + url, function(res) {
        if (res.statusCode >= 200 || res.statusCode <= 299) {
            logger.data(name + ': OK')
        } else {
            logger.error(name + ': FAILED')
            testOk = false
            brokenList.push(name)
        }
    }).on('error', function(e) {
        logger.error(name + ': FAILED')
        testOk = false
        brokenList.push(name)
    })
}

// API tester.
function testApi(url , name) {
    http.get(apiBase + url, function(res) {
        if (res.statusCode >= 200 || res.statusCode <= 299) {
            logger.data(name + ': OK')
        } else {
            logger.error(name + ': FAILED')
            testOk = false
            brokenList.push(name)
        }
    }).on('error', function(e) {
        logger.error(name + ': FAILED')
        testOk = false
        brokenList.push(name)
    })
}

// Test the server
logger.info('Waiting 3 seconds for server to come online.')
setTimeout (function() {

    // Make sure the server is online.
    testApi('/info/online', 'Online')

    if (testOk) {
        logger.info('Testing server...')

        // Test the web server.
        testPage('/dash/0', 'Main Dash')
        testPage('/about', 'About Page')

        // Test the API
        testApi('/cpu/temp', 'CPU Temp')
        testApi('/ram/usage', 'RAM Usage')
    } else {
        logger.error('Server not online!')
    }

}, 3000)

// Print results.
setTimeout (function() {

    var everythingState = 'OK'
    if (!testOk) everythingState = 'not OK'

    logger.state('RESULTS: Everything seems to be ' + everythingState + '.')

    if (!testOk) {
        var brokenListText = ""
        for (var i=0; i<brokenList.length; i++) {
            brokenListText += '\n' + brokenList[i]
        }
        logger.data('THINGS THAT BROKE:' + brokenListText)
    }

}, 6000)

// Quit.
setTimeout (function() {

    logger.state('Finishing up...')
    child.stdin.write('/quit')

}, 6500)
// Import config. (Thanks @Ernie3 for adding this!)
const config = require('./config.json')

// Import libraries.
const logger = require('./logger.js')
const hhmmss = require('./hhmmss.js')

// CLI prepper.
exports.initCli = function() {
  
  // Prepare stdin.
  logger.info('Initializing console commands...')
  process.stdin.resume()
  process.stdin.setEncoding('utf8')
  process.stdin.on('data', function (text) {
    
    // Prep command.
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
        logger.data('CONFIG: App on port ' + config.port + '.')
        
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
}

// Import libraries.
const chalk = require('chalk')

// Tag list.
var tags = []
tags['blank'] = '        '
tags['continue'] = ':       '
tags['info'] =  chalk.cyan('[INFO ] ')
tags['warn'] =  chalk.yellow('[WARN ] ')
tags['data'] =  chalk.green('[DATA ] ')
tags['error'] = chalk.red('[ERROR] ')
tags['fatal'] = chalk.bold.red('[FATAL] ')
tags['state'] = chalk.magenta('[STATE] ')

// Message processor.
function processMessage(message, tag) {
  return tags[tag] + message.replace(/\n/g, '\n' + tags['continue'])
}

// Blank log.
exports.blank = function(message) {
  console.log(processMessage(message, 'blank'))
}

// Warn log.
exports.warn = function(message) {
  console.log(processMessage(message, 'warn'))
}

// Info log.
exports.info = function(message) {
  console.log(processMessage(message, 'info'))
}

// Data log.
exports.data = function(message) {
  console.log(processMessage(message, 'data'))
}

// Error log.
exports.error = function(message) {
  console.log(processMessage(message, 'error'))
}

// Fatal log.
exports.fatal = function(message) {
  console.log(processMessage(message, 'fatal'))
}


// State log.
exports.state = function(message) {
  console.log(processMessage(message, 'state'))
}

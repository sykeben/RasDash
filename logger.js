// Import libraries.
const chalk = require('chalk')

// Tag list.
var tags = []
tags["blank"] = "        "
tags["info"] =  chalk.cyan("[INFO]  ")
tags["warn"] =  chalk.yellow("[WARN]  ")
tags["data"] =  chalk.green("[DATA]  ")
tags["error"] = chalk.red("[ERROR] ")
tags["fatal"] = chalk.bold.red("[FATAL] ")

// Blank log.
exports.blank = function(message) {
  console.log(tags["blank"]+message)
}

// Warn log.
exports.warn = function(message) {
  console.log(tags["warn"]+message)
}

// Info log.
exports.info = function(message) {
  console.log(tags["info"]+message)
}

// Data log.
exports.data = function(message) {
  console.log(tags["data"]+message)
}

// Error log.
exports.error = function(message) {
  console.log(tags["error"]+message)
}

// Fatal log.
exports.fatal = function(message) {
  console.log(chalk.red(tags["fatal"]+message))
}

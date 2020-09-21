// Import libraries.
const express = require('express')
const systeminformation = require('systeminformation')

// Get server config.
const serverConfig = require('../config/server.json')

// Initialize express application.
const app = express()
app.set('views', 'views')
app.set('view engine', 'ejs')

// Setup backend.
app.get('/api/get', (req, res) => {
    res.json(null)
})

// Setup frontend.
app.use(express.static('public'))
app.get('/', (req, res) => res.redirect('/dashboard'))
app.get('/dashboard', (req, res) => {
    res.render('dashboard')
})

// Start server.
app.listen(serverConfig.port, () => {
    console.log(`Server started on port ${serverConfig.port}`)
})

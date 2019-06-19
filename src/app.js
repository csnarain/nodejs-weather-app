const express = require('express')
const path = require('path')
const hbs = require('hbs')
const wapi = require('./weather-api')

const app = express()
const port = process.env.PORT || 3000

//Define paths for express config
const pubDir = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

//Setup handlebars engine & view location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)


//Setup static directory to serve
app.use(express.static(pubDir))

// const webObjects = {
//     name: 'Lakshminarayanan S',
//     title: 'Manager',
//     company: 'EY',
// }

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Lakshminarayanan S'
    })
})

app.get('/About', (req, res) => {
    res.render('About', {
        name: 'Lakshminarayanan S'
    })
})

app.get('/Help', (req, res) => {
    res.render('Help', {
        helpText: 'This is the help page',
        title: 'Weather App',
        name: 'Lakshminarayanan S'
    })
})

app.get('/help/*', (req,res) => {
    res.render('http404', {
        Error: 'Help article not found'
    })
})

// app.get('/weather', (req,res) => {
//     if (!req.query.address) {
//         return res.send({
//             error: 'Please provide an address to check the weather for'
//         })
//     }
//     res.send({
//         address: req.query.address,
//         weather: 'Rain likely'
//     })
// })
app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: 'No search term provided'
            
        })
    }

    console.log(req.query.search)
    res.send({
        products: []
    })
})

let latitude, longitude
app.get('/weather', (req, res) => {
wapi.geocode(req.query.address, (error, {latitude, longitude, location}) => {
    wapi.forecast(latitude, longitude, (error, body) => {
        res.send({
            forecast: body.hourly.summary,
            location,
            address: req.query.address
        })
        
        })
    })
    
})

app.get('*', (req,res) => {
    res.render('http404', {
        Error: 'page not found'
    })
})

app.listen(port, () => {
    console.log('listening on port' + port)
})
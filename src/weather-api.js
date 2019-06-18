// import { request } from "https";
const request = require('request')

const geocode = (address, callback) => {
const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1IjoibXBlcnVtYWFuIiwiYSI6ImNqd25pMHAxMTBlaDY0NW53MGN2dGc5ZmcifQ.IvfVQuOs4gc7E4PGmsHY4w'

request({url, json: true}, (error, { body }) => {
    if(error) {
        callback(error, undefined)
    } else if (body.features.length === 0) {
        callback (error, undefined)
    } else {
        callback(undefined, {
            latitude: body.features[0].center[1],
            longitude: body.features[0].center[0],
            location: body.features[0].place_name })
    }
})
}

const forecast = (latitude, longitude, callback) => {
    const url = `https://api.darksky.net/forecast/0776aeef660eebd8ee734312e3d33d2b/${latitude},${longitude}`
    request ({url, json:true}, (error, { body }) => {
            if (error) {
                callback('error', undefined)
            }
            else {
                callback(undefined, body)
            }
})        
}

module.exports = {
    geocode,
    forecast
}
const wapi = require('./weather-api.js')

if (process.argv[2]!=undefined) {
    wapi.geocode(process.argv[2], (error, { latitude, longitude, location }) => {
        if (error) {
            return console.log(error)
        }
        else {
            wapi.forecast(latitude, longitude, (error, forecastData) => {
                if (error) {
                    console.log(error);
                }
                else
                console.log(forecastData.hourly.summary)
            })
        }
    })
}

else {
    console.log('Please provide an address')
}
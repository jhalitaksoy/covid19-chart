const serviceUrl = 'https://pomber.github.io/covid19/'
const countriesRoute = 'countries.json' 
const timeSeriesRoute = 'timeseries.json' 

function loadCountries() {
    return fetchFromService(serviceUrl, countriesRoute)
}

function loadTimeSeries() {
    return fetchFromService(serviceUrl, timeSeriesRoute)
}

function fetchFromService(serviceUrl, route) {
    return fetch(serviceUrl + route).then(data => data.json())
}

module.exports.loadCountries = loadCountries
module.exports.loadTimeSeries = loadTimeSeries
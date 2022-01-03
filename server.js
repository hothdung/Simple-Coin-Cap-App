const express = require('express');
const axios = require('axios');

const app = express();
const API_KEY = "63e537c3-a81a-4d9b-8ad6-de09f385231f";

app.set('port', process.env.PORT || 3000);

// req request, res response
app.get('/api/coins', function (req, res) {
    axios.get('https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest?limit=100', {
        headers: {
            'X-CMC_PRO_API_KEY': API_KEY
        }
    }).then(function (response) {
        // client should not cache response of server
        // json response dynamic
        res.setHeader('Cache-Control', 'no-cache');
        // set response successfully
        // data as part of response 
        // res = from express that we finally set; response = response sending from an axios call
        // send data on sucess
        res.json(response.data);
    }).catch(function (error) {
        console.log('api call failed:(', error);
    })
})

// api call for globalMarketData

app.get('/api/market_data', function (req, res) {
    axios.get('https://pro-api.coinmarketcap.com/v1/global-metrics/quotes/latest ', {
        headers: {
            'X-CMC_PRO_API_KEY': API_KEY
        }
    }).then(function (response) {
        res.setHeader('Cache-Control', 'no-cache');
        res.json(response.data);
    }).catch(function (error) {
        console.log('api call failed:(', error);
    })
})

// final step --> server bind and listen to specific port
// set the port earlier
app.listen(app.get('port'), function () {
    console.log('Find the server at http://localhost:' + app.get('port'));
});
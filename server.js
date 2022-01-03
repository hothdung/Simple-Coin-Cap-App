const express = require('express');
const axios = require('axios');

const app = express();

app.set('port', process.env.PORT || 3000);

// req request, res response
app.get('/api/coins', function (req, res) {
    axios.get('https://api.coinmarketcap.com/v2/ticker/?limit=100').then(function (response) {
        // client should not cache response of server
        // json response dynamic
        res.setHeader('Cache-Control', 'no-cache');
        // set response successfully
        // data as part of response 
        // res = from express that we finally set; response = response sending from an axios call
        res.json(response.data);
    }).catch(function (error) {
        console.log('api call failed:(', error);
    })
})

// api call for globalMarketData
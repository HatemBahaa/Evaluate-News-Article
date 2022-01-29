var path = require('path')
const express = require('express')
const mockAPIResponse = require('./mockAPI.js')
let cors = require('cors')
const dotenv= require('dotenv');
var bodyParser = require('body-parser')
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));


const app = express()


dotenv.config()

app.use(cors())

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use(express.static('dist'))

console.log(__dirname)

app.get('/', function (req, res) {
    res.sendFile(path.resolve('dist/index.html'))
})

// designates what port the app will listen to for incoming requests
app.listen(8081, function () {
    console.log('App is listening on port 8081')
})

app.get('/test', function (req, res) {
    res.send(mockAPIResponse)
})

app.post('/api', async(req, res) => {
    const urlOnTest = req.body.urlOnTest;
    const response = await fetch(`https://api.meaningcloud.com/sentiment-2.1?key=${process.env.api_Key}&url=${urlOnTest}&lang=en`)
    const receivedData = await response.json()
    
    return res.send(receivedData)     
})



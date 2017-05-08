const path = require('path');
const express = require('express');
const volleyball = require('volleyball');
const bodyParser = require('body-parser');
const cors = require('cors');

const PORT = 3000;


const app = express();
app.use(cors());
app.options('*', cors());

let data = {
  temperature: '',
  picture: '',
}
//logging middleware
app.use(volleyball);

//body parsing middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true}));

app.listen(PORT, () => {
 console.log('Server listening on Port: ', PORT);
})

//redirect api routes
app.use('/api', require('./api'));
// app.use('/tessel', tessel)
app.use(express.static(path.join(__dirname, '..', 'client/src/public')));
app.use(express.static(path.join(__dirname, '..', 'node_modules')));


app.get('/tessel', function(req, res, next){
  console.log('tried to get tessel data');
 res.status(200).json(data);
})

app.post('/tessel/temperature', function(req, res, next){
  console.log(req.body.temperature);
  data.temperature = req.body.temperature
})

app.post('/tessel/picture', function(req, res, next){

    console.log('Request received');

    var imageData = new Buffer(0);

    req.on('data', function (chunk) {
        imageData = Buffer.concat([imageData, chunk]);
    });

    req.on('end', function () {
       // Full image ready.
        data.picture = imageData
    });

});


app.get('*', (req, res, next) => {
 res.sendFile(path.join(__dirname, '..', 'client/src/public/index.html'));
});

//Error Handler
app.use('/', (err, req, res, next) => {
 console.error(err);
 console.error(err.stack);
 res.status(err.status || 500).send(err.message || 'Internal Server error.');
});
var http = require('http');
var tessel = require('tessel');
var climatelib = require('climate-si7020');
var climate = climatelib.use(tessel.port['A']);



var postOptions = {
    host: "192.168.3.97", //need host
    port: 3000, //need port
    path: "/tessel/temperature",
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    }
};


function SendData(postData) {
  var req = http.request(postOptions, function(res) {
    console.log('# statusCode', res.statusCode);

    res.on('end', function () {
      console.log('done!');
    });

    res.on('data', function(data) {
      //don't need anything here... but doesn't seem to work otherwise
    });

  });

  req.on('error', function (e) {
    console.log('not ok -', e.stack, 'error event');
  });

  req.write(postData);
  req.end();

}

climate.on('ready', function () {
  console.log('Connected to si7005');

  // Loop forever
  setImmediate(function loop () {
    climate.readTemperature('f', function (err, temp) {
      climate.readHumidity(function (err, humid) {
        temp -= 11;
        var postData = JSON.stringify({
          'temperature': temp.toFixed(2),
          'humidity': humid.toFixed(2)
        });
        SendData(postData);
        setTimeout(loop, 500);
      });
    });
  });
});

climate.on('error', function(err) {
  console.log('error connecting module', err);
});


// var tessel = require('tessel');
// var climatelib = require('climate-si7020');
// var http = require('http');

// var climate = climatelib.use(tessel.port['A']);

// climate.on('ready', function(){
//   console.log('connected to climate');
  
//   setInterval(function(){
//     climate.readHumidity(function(err, humid){
//       climate.readTemperature('f', function(err, temp){
//         var request = http.request({
//             hostname: 'localhost', // Where your other process is running
//             port: 3000,
//             path: '/tessel/temperature',
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json'
//             }
//         });
//         const temperature = temp.toFixed(4);
//         const humidity = temp.toFixed(4);

//         console.log('Degrees:', temp.toFixed(4) + 'F', 'Humidity:', humid.toFixed(4) + '%RH');

//         request.write({temperature, humidity});
//       });
//     });
//   }, 1000);
// });

// climate.on('error', function(err) {
//   console.log('error connecting module', err);
// });


// takePicture.on('data', function (image) {
    
//     var request = http.request({
//         hostname: '192.168.1.23', // Where your other process is running
//         port: 3001,
//         path: '/upload-pic',
//         method: 'POST',
//         headers: {
//             'Content-Type': 'image/jpg',
//             'Content-Length': image.length
//         }
//     });

//     request.write(image);
    
// });

// takePicture.on('error', function (err) {
//     console.error(err);
// });


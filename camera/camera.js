
// var av = require('tessel-av');
// var os = require('os');
// var http = require('http');
// var port = 8000;
// var camera = new av.Camera();

// http.createServer((request, response) => {
//   response.writeHead(200, { 'Content-Type': 'image/jpg' });

//   camera.capture().pipe(response);

// }).listen(port, () => console.log(`http://${os.hostname()}.local:${port}`));




var http = require('http');
var av = require('tessel-av');
var camera = new av.Camera();

function pictureTime () {

  var takePicture = camera.capture();

  takePicture.on('data', function (image) {
      
      var request = http.request({
          hostname: '192.168.3.97', // Where your other process is running
          port: 3001,
          path: '/upload-pic',
          method: 'POST',
          headers: {
              'Content-Type': 'image/jpg',
              'Content-Length': image.length
          }
      });

      request.write(image);
      
  });

  takePicture.on('error', function (err) {
      console.error(err);
  });
}


module.exports = pictureTime;

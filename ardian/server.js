const http = require('http');
const fs = require('fs');

var server = module.exports = exports = http.createServer((req, res) => {

  var name = req.url.split('/')[2];

  if (req.method === 'GET' &&(req.url === '/' || req.url === '/index.html')) {
    res.writeHead(200, {'Content-Type': 'text/html'});
    var index = fs.createReadStream(__dirname + '/public/index.html');
    return index.pipe(res);
  }

  if (req.method === 'GET' && req.url === '/time') {
    res.writeHead(200, {'Content-Type': 'application/json'});
    res.write(JSON.stringify({msg:'Today\'s date and time: ' + new Date().toString()}));
    return res.end(); //closes connection
  }
  //
  // if(req.method === "GET" && req.url === '/greet') {
  //   res.writeHead(200, {'Content-Type': 'text/plain'});
  //   res.write('Hello world');
  //   return res.end();
  // }

  if (req.method === 'GET' && req.url === '/greet/' + name) {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.write('Hello ' + name);
    return res.end();
  }

  if (req.method === 'POST' && req.url == '/greet') {
    var body = '';
    req.on('data', (data) => {
      body += data;
    });
    req.on('end', () => {
      res.writeHead(200, {'Content-Type': 'text/plain'});
      res.write('Hello ' + (JSON.parse(body).name));
      res.end();
    });
    return;
  }

  res.writeHead(404, {'Content-Type': 'application/json'});
  res.write(JSON.stringify({msg: 'page not found'}));
  return res.end();
});

server.listen(3000, () => {
  console.log('Server up on port 3000');//eslint-disable-line
});

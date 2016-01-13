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
    res.write('Today\'s date and time: ' + new Date().toString());
    return res.end(); //closes connection
  }


  if (req.method === 'GET' && req.url === '/greet/' + name) {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.write('Hello ' + name);
    return res.end();
  }

  res.writeHead(404, {'Content-Type': 'application/json'});
  res.write(JSON.stringify({msg: 'page not found'}));
  return res.end();
});

server.listen(3000, () => console.log('server up'));

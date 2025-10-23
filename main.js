const http = require('http');
const path = require('path');
const fs = require('fs');

const basePath = 'C:\\Users\\kozyk_vs\\Desktop\\test_server';

const server = http.createServer((req, res) => {
  let filePath = path.join(basePath, req.url === '/' ? 'index.html' : req.url);
  const ext = path.extname(filePath).toLowerCase();

  const mimeTypes = {
    '.html': 'text/html',
    '.js': 'text/javascript',
    '.css': 'text/css',
    '.json': 'application/json',
    '.png': 'image/png',
    '.jpg': 'image/jpeg',
    '.jpeg': 'image/jpeg',
    '.ico': 'image/x-icon',
  };

  const contentType = mimeTypes[ext] || 'application/octet-stream';
    
  fs.readFile(filePath, (err, data) => {
    if (err) {
      console.error(err);

      if (err.code === 'ENOENT') {
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end('404 Not Found');
      } else {
          
        res.writeHead(500, { 'Content-Type': 'text/plain' });
        res.end('500 Internal Server Error');
      }
      return;
    }

    res.writeHead(200, { 'Content-Type': contentType });
    res.end(data);
  });
});

server.listen(3000, () => {
  console.log('Server running at http://localhost:3000');
});

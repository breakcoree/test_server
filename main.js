// @region_fast_debug
function print(a) {
  console.log(a)
}
// @endregion_fast_debug

// @region_libs
const http = require('http');
const path = require('path');
const fs = require('fs');
// @endregion_libs

const base_path = 'C:\\Users\\kozyk_vs\\Desktop\\test_server';

let notes = []
const notes_files = path.join(base_path, 'utf8')
if (fs.existsSync(notes_files)) {
  try {
    notes = JSON.parse(fs.readFileSync(notes_files, 'utf8'))
  } catch (e) {
    print('adsadsadasd', e)
    notes = []
  }
} else {
  notes = []

}

// @region_create_the_server
const server = http.createServer((req, res) => {

    if (req.method === 'GET' && req.url === '/api/notes') {
      res.writeHead(200, {'Content-Type': 'application/json'})
      res.end(JSON.stringify({container: 'notes', data: notes}, null, 2))
      print('get was fired')
      return;
  }

  if (req.method === 'POST' && req.url == '/ap/notes') {
    let body = ''
    req.on('data', chunk => (body += chunk))
    req.on('end', () => {
      try {
        const new_note = JSON.parse(body)
        new_note.id = notes.length ? notes[notes.length - 1].id + 1 : 1
        new_note.updateAt = new Date().toDateString()

        notes.push(new_note)
        fs.writeFileSync(notes_files, JSON.stringify(notes, null, 2))
      } catch(err) {
        res.writeHead(400, {'Content-Type': 'application/json'})
        res.end(JSON.stringify({error: 'lol', message: err.message}))
      }
    })
    return
  }

  let file_path = path.join(base_path, req.url === '/' ? 'index.html' : req.url);
  const ext = path.extname(file_path).toLowerCase();
  // @region_mimetype
  const mime = {
    '.html':  'text/html',
    '.js':    'text/javascript',
    '.css':   'text/css',
    '.json':  'application/json',
    '.png':   'image/png',
    '.jpg':   'image/jpeg',
    '.jpeg':  'image/jpeg',
    '.ico':   'image/x-icon',
  };
  // @endregion_mimetype

  const content_type = mime[ext] || 'application/octet-stream';
    
  fs.readFile(file_path, (err, data) => {
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

    res.writeHead(200, { 'Content-Type': content_type });
    res.end(data);
  });
});
// @endregion_create_the_server

// @region_start_the_server
server.listen(3000, () => {
  console.log('Server running at http://localhost:3000');
});
// @endregion_start_the_server
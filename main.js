function print(a) {
    console.log(a)
}


const http = require('http');
const path = require('path');
const fs = require('fs');
console.log(fs)


const server = http.createServer((req, res) => {
    let file_path
    let ext_name = path.extname(file_path)
    let content_type
    switch(ext_name) {
        case '.js':
            content_type = 'text/javascript'
        case '.css':
            content_type = 'text/css'
    }

    switch(req.url) {
        case '' || '/':
            file_path = path.join('C:\\Users\\kozyk_vs\\Desktop\\test_server', 'index.html')
            break;
        default:
            file_path = path.join('C:\\Users\\kozyk_vs\\Desktop\\test_server', 'index.html')
            break;
    }

        fs.readFile(file_path, (err, data) => {
        if (err) {
            print(err)
            res.writeHead(404, {'Content-Type': 'text/plain'})
            res.end('404asdasd')
            return;
        }

        res.writeHead(200, {'Content-Type': 'text/html'});
        res.end(data)
    });
});

server.listen(3000, () => {
    console.log('Server running on port 3000');
}); 
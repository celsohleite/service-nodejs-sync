
var contato = require('./contato');
const http = require('http');
const hostname = '127.0.0.1';
const port = 3000

const server  = http.createServer((req, resp) => {
    resp.statsCode =200;
    resp.setHeader('Content-Type', 'text/plain');
    resp.end('Hello World.');
});

app.use('/api/usuario');

server.listen(port,hostname,()=>{
    console.log(`Server running at http://${hostname}:${port}/`);
});
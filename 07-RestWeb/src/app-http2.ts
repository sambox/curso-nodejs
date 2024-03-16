import { log } from 'console';
import http2 from 'http2';
import fs from 'fs';

const server = http2.createSecureServer({
  key: fs.readFileSync('./keys/server.key'),
  cert: fs.readFileSync('./keys/server.crt'),
}, (req, res) => {
  console.log(req.url);
  // res.writeHead(200, {'Content-Type': 'text/html'});
  // res.write(`<h1>URL ${req.url}</h1>`);
  // res.end();

  // const data = { name: 'John Doe', age: 34, city: 'Buenos Aires'};
  // res.writeHead(200, {'Content-Type': 'application/json'});
  // res.end(JSON.stringify(data));
  // if (req.url!== undefined && (req.url?.indexOf('favicon.ico') > -1 || req.url?.indexOf('service-worker.js') > -1)) {
  //   res.writeHead(404, {'Content-Type': 'text/html'});
  //   res.end('<h1>404 Not Found</h1>');
  //   return;

  // }
  if (req.url === '/') {
    const htmlFile = fs.readFileSync('./public/index.html', 'utf8');
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.end(htmlFile);
    return;
  }
  if (req.url?.endsWith('.js')) {
    res.writeHead(200, { 'Content-Type': 'application/javascript' });
  }
  if (req.url?.endsWith('.css')) {
    res.writeHead(200, { 'Content-Type': 'text/css' });
    // res.end('<h1>404 Not Found</h1>');
  }
  try {
    const responseContet = fs.readFileSync(`./public${req.url}`, 'utf8');
    res.end(responseContet);

  } catch (error) {
    res.writeHead(404, { 'Content-Type': 'text/html' });
    res.end('<h1>404 Not Found</h1>');
    return;
  }

});

server.listen(8080, () => {
  console.log('Server is running on port 8080');
});
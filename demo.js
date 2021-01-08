const http = require('http');
var fs = require('fs');
const url = require('url');

const hostname = '127.0.0.1';
const port = 3000;

const server = http.createServer((req, res) => {
    var pathname = url.parse(req.url).pathname;

    console.log("req for pathname=" + pathname);

    // res.statusCode = 200;
    // res.setHeader('Content-Type', 'text/plain');
    // res.end('Hello World');

    // 从文件系统中读取请求的文件内容
    fs.readFile(pathname.substr(1), function (err, data) {
        if (err) {
            console.log(err);
            // HTTP 状态码: 404 : NOT FOUND
            // Content Type: text/html
            res.writeHead(404, {'Content-Type': 'text/html'});
        }else{
            // HTTP 状态码: 200 : OK
            // Content Type: text/html
            res.writeHead(200, {'Content-Type': 'text/html'});

            // 响应文件内容
            res.write(data.toString());
        }
        //  发送响应数据
        res.end();
    });
});

server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});

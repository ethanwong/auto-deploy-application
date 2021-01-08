/*
 * @Description: 
 * @Author: Ethan Wong
 * @Date: 2021-01-08 09:50:55
 * @FilePath: \app.js
 * @LastEditTime: 2021-01-08 17:16:31
 * @LastEditors: your name
 */
var express = require('express');
var app = express();
var bodyParser = require('body-parser')
var process = require('child_process');

//parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
//parse application/json
app.use(bodyParser.json())

app.use('/public', express.static('public'));

app.get('/', function (req, res) {
    res.send('<h1>auto-deploy-application</h1>');
})


app.post('/deploy', function (req, res) {

    console.log("hostname="+req.hostname)
    console.log("ip="+req.ip)
    console.log("originalUrl="+req.originalUrl)
    console.log("path="+req.path)
    console.log("query="+req.query)

    
    var command = 'sh deploy.sh restart';
    exec(command);

    console.log(JSON.stringify(req.body));
    
    res.send("ok");
})

function exec(command){
    process.exec(command, function(error, stdout, stderr) {
    console.log("error:"+error);
    console.log("stdout:"+stdout);
    console.log("stderr:"+stderr);
});
}

var server = app.listen(4000, function () {

    var host = server.address().address
    var port = server.address().port

    console.log("应用实例，访问地址为 http://%s:%s", host, port)

})

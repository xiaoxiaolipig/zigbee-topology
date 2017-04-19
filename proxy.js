var http=require('http'),
    httpProxy=require('http-proxy'),
    express=require('express');

var app=express();
var server=http.Server(app);
var apiProxy=httpProxy.createProxyServer();

app.use('/api',function (req,res) {
    console.log("request",req);
    apiProxy.web(req,res,{target:'http://192.168.1.105:8080'},function (err) {
        console.log("error",err);
    });
});
// app.use('api',(req,res)=>{
//     console.log("request ",req);
//     apiProxy.web(req,res,{target:"http://192.168.1.105:8080"},function (err) {
//         console.log("error ",err);
//     });
// });
app.use(express.static('.'));
server.listen(8080,function () {
    console.log("api is listening on port 8080");
});
process.on('SIGINT',function () {
    process.exit();
});
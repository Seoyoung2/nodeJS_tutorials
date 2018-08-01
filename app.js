var express = require('express');
var app = express();

//정적인 파일이 위치할 디렉토리 지정
app.use(express.static('public'));

app.get('/', function(req, res){
    res.send('Hello home page!');
});
app.get('/dynamic', function(req, res){

    var lis = '';
    for(var i=0; i<5; i++){
      lis += '<li>coding</li>';
    }
    var time = Date();
    var output = `<!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <title></title>
      </head>
      <body>
        Hello, Dynamic!
        <ul>
          ${lis}
        </ul>
        ${time}
      </body>
    </html>
`
    res.send(output);
});
app.get('/dog', function(req, res){
    res.send('Hello dog!, <img src="/dog2.png">');
});
app.get('/login', function(req, res){
    res.send('Login please');
});
app.listen(3000, function(){
    console.log('connected 3000 port!');
});

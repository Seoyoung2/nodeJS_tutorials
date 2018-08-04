var express = require('express');
var bodyParser = require('body-parser');
var app = express();

app.locals.pretty = true;
// pug템플릿 엔진과 express연결
app.set('view engine', 'pug');
app.set('views', './views');

//정적인 파일이 위치할 디렉토리 지정
app.use(express.static('public'));
//가져온 body-parser모듈을 연결,
//app에 들어오는 모든 요청(post방식)사용할 수 있도록 body객체 생성
app.use(bodyParser.urlencoded({extended: false}));

/*
  get방식 : url에 노출(로그인엔 부적합), 일정길이보다 길면 정보 버림
  post방식 : 로그인?, 암시적, 용량제한없음, body-parser 미들웨어 필요
*/
app.get('/form', function(req, res){
  res.render('form');
});
app.get('/form_receiver', function(req, res){
  var title = req.query.title;
  var description = req.query.description;
  res.send(title+','+description);
});
app.post('/form_receiver', function(req, res){
  var title = req.body.title;
  var description = req.body.description;
  res.send(title+','+description);
});

app.get('/topic/:id', function(req, res){
    var topics = [
        'Javascript is ...',
        'Nodejs is ...',
        'Express is ...'
    ];
    var output = `
    <a href="/topic/0">JavaScript</a><br>
    <a href="/topic/1">Nodejs</a><br>
    <a href="/topic/2">Express</a><br><br>
    ${topics[req.params.id]}
    `
    res.send(output);
});

app.get('/topic/:id/:mode', function(req, res){
    res.send(req.params.id+','+req.params.mode);
})

app.get('/template', function(req, res){
    res.render('temp', {time: Date(), _title: 'Pug'});
});

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

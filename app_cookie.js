var express = require('express');

var cookieParser = require('cookie-parser');//쿠키 파서 사용

var app = express();

app.use(cookieParser());//expressjs API보면 나옴

app.get('/count', function(req, res){

if(req.cookies.count)//쿠키값이 있다면

var count = parseInt(req.cookies.count);//숫자로 강제로 바꿈

else{//쿠키값이 없다면

var count = 0;

}

count = count + 1;//카운트 값을 올리고

res.cookie('count', count);

res.send('count : '+ req.cookies.count);//cookies객체에 count라는 쿠키값을 가져옴

});

 

app.listen(3003, function(){

console.log('Connected 3003 port!!!');

});

 

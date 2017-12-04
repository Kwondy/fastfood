var express = require('express'); var router = express.Router(); 
var passport = require('passport'), LocalStrategy = require('passport-local').Strategy; 

var mysql = require('mysql'); 
var pool = mysql.createPool({
   user: 'test1',
  database: 'board',
  password: '1234'
});


/*

passport.use('local', new LocalStrategy({

  usernameField: 'email',

  passwordField: 'password',

  passReqToCallback: true //passback entire req to call back
} , function (req, email, password, done){


      if(!email || !password ) { return done(null, false, req.flash('message','All fields are required.')); }

      var salt = '7fa73b47df808d36c5fe328546ddef8b9011b2c6';

      connection.query("select * from user_1 where email = ?", [email], function(err, rows){

          console.log(err); console.log(rows);

        if (err) return done(req.flash('message',err));

        if(!rows.length){ return done(null, false, req.flash('message','Invalid username or password.')); }

        salt = salt+''+password;

        var encPassword = crypto.createHash('sha1').update(salt).digest('hex');


        var dbPassword  = rows[0].password;

        if(!(dbPassword == encPassword)){

            return done(null, false, req.flash('message','Invalid username or password.'));

         }

        return done(null, rows[0]);

      });

    }

));

passport.serializeUser(function(user, done){

    done(null, user.id);

});

passport.deserializeUser(function(id, done){

    connection.query("select * from user_1 where email = "+ email, function (err, rows){

        done(err, rows[0]);

    });

});


*/

passport.use(new LocalStrategy({
  usernameField: 'email',
  passwordField: 'password',
  passReqToCallback: true //인증을 수행하는 인증 함수로 HTTP request를 그대로  전달할지 여부를 결정한다
}, function (req, email, password, done) {
  if(email === 'test1@naver.com','user@naver.com' && password === '1234','1234'){
    return done(null, {
      'user_id': email,
    });
  }else{
    return done(false, null)
  }
}));

passport.serializeUser(function (user, done) {
  done(null, user)
});

passport.deserializeUser(function (user, done) {
  done(null, user);
});

/*
passport.use(new LocalStrategy({
  usernameField: 'email',
  passwordField: 'password',
  passReqToCallback: true //인증을 수행하는 인증 함수로 HTTP request를 그대로  전달할지 여부를 결정한다
}, function (req, email, password, done) {
  connection.query('select *from `user_1` where `email` = ?', email, function (err, result) {
    if (err) {
      console.log('err :' + err);
      return done(false, null);
    } else {
      if (result.length === 0) {
        console.log('해당 이메일이 없습니다');
        return done(false, null);
      } else {
        if (!bcrypt.compareSync(password, result[0].password)) {
          console.log('패스워드가 일치하지 않습니다');
          return done(false, null);
        } else {
          console.log('로그인 성공');
          return done(null, {
            email: result[0]email,
            nickname: result[0].nickname
          });
        }
      }
    }
  })
}));
*/

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});

router.get('/register', function(req, res){
  res.render('register');
});

router.get('/login',function(req,res){
  res.render('login');
});

router.post('/login', passport.authenticate('local', {failureRedirect: '/login', failureFlash: true}), // 인증 실패 시 401 리턴, {} -> 인증 스트레티지
  function (req, res) {
    res.redirect('indax');
  });

router.post('/register', function(req,res,next){

    var email = req.body.email;
    var name= req.body.name;
    var password = req.body.password;
    var ph = req.body.ph;
    var datas = [email,name,password,ph];

    pool.getConnection(function (err, connection)
    {
        // Use the connection
        var sqlForInsertBoard = "insert into user_1(email, name, password, ph) values(?,?,?,?)";
        connection.query(sqlForInsertBoard,datas, function (err, rows) {
            if (err) console.error("err : " + err);
            console.log("rows : " + JSON.stringify(rows));

            res.render('indax');
            connection.release();

            // Don't use the connection here, it has been returned to the pool.
        });
    });
});


var isAuthenticated = function (req, res, next) {
  if (req.isAuthenticated())
    return next();
  res.redirect('/login');
};

router.get('/myinfo', isAuthenticated, function (req, res) {
  res.render('myinfo',{
    title: 'My Info',
    email: req.email
  })
});
router.get('/login',function(req,res){
  res.render('login');
});
router.get('/indax',function(req,res){
  res.render('indax');
});

router.get('/logout', function (req, res) {
  req.logout();
  res.redirect('/');
});

module.exports = router;

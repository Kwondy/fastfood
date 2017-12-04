var express = require('express');
var router = express.Router();

router.post('/login', function (req, res, next) {
  var
    email = req.body.email,
    password =   req.body.password;

  connection.query('select *from `user_1` where `email` = ?', email, function (err, result) {
    if (err) {
      console.log('err :' + err);
    } else {
      if (result.length === 0) {
        res.json({success: false, msg: '해당 이메일이  존재하지 않습니다.'})
      } else {
        if (!bcrypt.compareSync(password, result[0].password)) {
          res.json({success: false, msg: '비밀번호가 일치하지 않습니다.'})
        } else {
          res.json({success: true})
        }
      }
    }
  });
});
module.exports = router;

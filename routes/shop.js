var express = require('express');
var router = express.Router();

router.get('/', function(req, res){
  res.render('shop');
});

router.get('/menu', function(req, res){
  res.render('menu');
});

module.exports = router;

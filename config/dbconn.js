var mysql        = require('mysql');

var connection   = mysql.createConnection({

  supportBigNumbers: true,

  bigNumberStrings: true,

  host     : "localhost",

  user     : "test1",

  password : "1234",

  database : "board"

});

module.exports = connection;

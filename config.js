let mysql = require('mysql');
let connection = mysql.createConnection({
    host: '192.168.100.100',
    user: 'root',
    password: '1',
    database: 'db'
});

connection.connect(function(err) {
    if (err) {
        return console.error('error: ' + err.message);
    }
    console.log('Connected to the MySQL server…');
});
 //module.exports = config;
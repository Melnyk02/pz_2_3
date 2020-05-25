//let config = require('./config.js');

let mysql = require('mysql');
let express = require('express');
let ejs = require('ejs');
let bodyParser = require ('body-parser')
let app = express();
 app.set ('views','./pz_2_3/views');
 app.set('view engine','ejs');
 let urlencodedParser = bodyParser.urlencoded({extended:false});

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
 //work with page

app.get ('/', (req, res)=>{
   res.render('index',{}) //оформлення сторынки
});
app.get ('/forma',(req, res)=>
{
    res.render('forma',{status: false})
});
//видправлення даних
app.post('/formAction', urlencodedParser, (req,res)=>{
    let name = req.body.name;
        let queryInsert = 'INSERT INTO  user (name,pass) VALUES (?,?);'
    connection.query(queryInsert,[name ,req.body.pass],(err) =>{
        if (err) throw err;
        res.render('forma', {status:true});
    });
});
app.get('/list', (req, res)=>{
    let sql = 'select * from user;'
    connection.query(sql,(err, result) =>{
        if (err) throw err;
        res.render('list', {list:result})
    });
});
app.get('/list/:id', (req, res)=>{
    let sql = 'select * from user where id = ?;'
    connection.query(sql, [req.params.id], (err, results)=>{
        if(err) throw err
        res.render('edir',{
            list: results
        })
    })

})

/*app.post('/formUpdate',urlencodedParser,(req,res)=>{
    let name = req.body.name;
    let id = req.body.id;
    let pass = req.body.pass;
    let sql = 'update user set name = ?, pass=?  where id=?;'
    connection.query(sql,[name, pass,id], (err)=>{
        if (err) throw err;
        res.redirect('/list');
    });
    })
 */
app.post("/formUpdate",urlencodedParser, (req, res)=>{
    let queryUpd = 'update user set name = ?, pass=?  where id=?;'
    connection.query(queryUpd, [req.body.name, req.body.pass, req.body.id], (err, results)=>{
        if(err) throw err;
        /*res.render( "list", {
            list: results,
            status: false
        });*/
         res.redirect('list')
    });
});

app.listen(3000, ()=>{
    console.log('Server connect');
});
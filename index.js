const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mysql = require('mysql');

const PORT = 1988;

var app = express();

app.use(cors());
app.use(bodyParser.json());

const conn = mysql.createConnection({
    host : 'localhost',
    user : 'root',
    password : 'root',
    database : 'bioskop',
    port: 3306
});

app.get('/', (req,res) => {
    if(conn) {
        var msg = 'Koneksi ke database sukses.'
    } else {
        msg = 'Koneksi ke database gagal.'
    }
    res.send(`<h3>Selamat datang di API! ${msg}</h3>`);
});

app.get('/getlistfilm', (req,res) => {
    var sql = 'SELECT * FROM film;';
    conn.query(sql, (err, results) => {
        if(err) throw err;
        res.send(results);
    });
});

app.post('/addfilm', (req,res) => {
    var sql = 'INSERT INTO film SET ?';
    conn.query(sql, data, (err, results) => {
        if(err) {
            return res.status(500).json({ 
                message: "There's an error on the server. Please contact the administrator.", error: err.message 
            });
        }
        res.send(results);
    });
});

app.put('/editfilm/:id', (req,res) => {
    var data = req.body;
    var sql = `UPDATE film SET ? WHERE id_film = ${req.params.id};`
    conn.query(sql, data, (err, results) => {
        if(err) throw err;
        res.send(results);
    });
});

app.delete('/deletefilm/:id', (req,res) => {
    var sql = `DELETE FROM film WHERE id_film = ${req.params.id}`;
    conn.query(sql, (err,results) => {
        if(err) throw err;
        res.send(results);
    });
});

app.listen(PORT, () => console.log('Node is running, APi active at ' + PORT));

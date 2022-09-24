const express = require('express')
const bodyParser = require('body-parser');
const mysql = require('mysql');
const cors = require('cors');

const app = express()
const PORT = process.env.PORT || 8080;

const db = mysql.createPool({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: 'root',
    database: 'movie_review_db'
})


app.use(bodyParser.urlencoded({extended: true}));
app.use(cors());
app.use(express.json())

app.get('/', (req, res)=>{res.send('')})

app.get('/api', (req, res) => {
    const sqlSelect = 'SELECT * from movie_reviews';
    db.query(sqlSelect, (err, result) => {
        if(err){
            res.send('No ok')
        }else{
            res.send(result);
        }
    })
})

app.post('/api/insert', (req, res) => {
    const movieName = req.body.movieName;
    const movieReview = req.body.movieReview;
    const sqlInsert = 'INSERT INTO movie_reviews (movie_name, movie_reviews) VALUES (? , ?)';
    db.query(sqlInsert, [movieName, movieReview], (err, result) => {
        if(err){
            console.log(err);
        }else{
            console.log( typeof(result));
            console.log(result);
        }
    })
})

app.delete('/api/delete/:movieName', (req, res) => {
    const name = req.params.movieName;
    const sqlDelete = 'DELETE from movie_reviews where movie_name = ?';
    db.query(sqlDelete, name, (err, result) => {
        if(err) console.log(err);
    })
})


app.put('/api/update', (req, res) => {
    const name = req.body.movieName;
    const review = req.body.movieReview;
    console.log(`name: ${name}, review: ${review}`);
    const sqlUpdate = 'UPDATE movie_reviews SET movie_reviews = ? WHERE movie_name = ?';
    db.query(sqlUpdate, [review, name], (err, result) => {
        if(err){
            console.log(err);
        }
    })
})

app.listen(PORT, () => console.log(`success ${PORT}`))


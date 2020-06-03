const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
// enviroment variable
const { MONGO_DB_URL, APP_NAME, PORT } = require("./config");

require("./book.js");
const Book = mongoose.model("Book");

mongoose.connect(MONGO_DB_URL)
    .then(() => console.log(`${APP_NAME}-MongoDB connection successful. `))

const app = express();
app.use(bodyParser.json());

// CORS
app.use(function(req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});

app.get('/', (req, res) => {
    res.send(`This is our ${APP_NAME} default landing page.`);
})

app.post('/book', (req, res) => {

    let newBook = {
        title: req.body.title,
        author: req.body.author,
        numberPages: req.body.numberPages,
        publisher: req.body.publisher
    }

    console.log("New Book Message Received")
    console.log(newBook)

    let book = new Book(newBook)

    book.save()
        .then(() => {
            console.log("New book created!")
            res.send("New book created!")
        })
        .catch((err) => {
            console.error(err)
            res.send("Unable to get results. Error: " + err)
        })


})


app.get('/books', (req, res) => {
    Book.find()
        .then((books) => {
            res.json(books)
        })
        .catch((err) => {
            console.error(err)
            res.send("Unable to get results. Error: " + err)
        })
})

app.get('/book/:id', (req, res) => {
    Book.findById(req.params.id)
        .then((book) => {
            res.json(book)
        })
        .catch((err) => {
            console.error(err)
            res.send("Unable to get results. Error: " + err)
        })
})


app.delete('/book/:id', (req, res) => {
    Book.findOneAndRemove(req.param.id)
        .then((book) => {
            res.send("Book removed successfully")
        })
        .catch((err) => {
            res.send("Unable to get results. Error: " + err)
        })
})



app.listen(PORT, () => {
    console.log(`${APP_NAME} service running on port ${PORT}`)
})
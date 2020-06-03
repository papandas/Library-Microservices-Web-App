const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const axios = require('axios');
// enviroment variable
const { MONGO_DB_URL, APP_NAME, PORT, BOOKS_URI, CUSTOMERS_URI } = require("./config");

require("./order.js");
const Order = mongoose.model("Order");

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

app.post('/order', (req, res) => {


    let newOrder = {
        CustomerID: mongoose.Types.ObjectId(req.body.CustomerID),
        BookID: mongoose.Types.ObjectId(req.body.BookID),
        initialDate: Date.now(),
        deliveryDate: Date.now()
    }

    let order = new Order(newOrder)

    order.save()
        .then(() => {
            console.log("New order created!")
            res.send("New order created!")
        })
        .catch((err) => {
            console.error(err)
            res.send("unable to create order. Error: " + err)
        })
})


app.get('/orders', (req, res) => {
    Order.find()
        .then((orders) => {
            res.json(orders)
        })
        .catch((err) => {
            console.error(err)
            res.send("Unable to get results. Error: " + err)
        })
})

app.get('/order/:id', (req, res) => {
    Order.findById(req.params.id)
        .then((order) => {
            if (order) {

                var results = {
                    "_id": order._id,
                    "CustomerID": order.CustomerID,
                    "CustomerName": "",
                    "BookID": order.BookID,
                    "BookTitle": "",
                    "initialDate": order.initialDate,
                    "deliveryDate": order.deliveryDate
                }

                axios.get(`${CUSTOMERS_URI}/customer/${order.CustomerID}`)
                    .then((response) => {
                        if (response.data) {
                            results.CustomerName = response.data.name
                        } else {
                            results.CustomerName = "[Not Available]"
                        }

                        axios.get(`${BOOKS_URI}/book/${order.BookID}`)
                            .then((response) => {
                                if (response.data) {
                                    results.BookTitle = response.data.title
                                } else {
                                    results.BookTitle = "[Not Available]"
                                }

                                res.json(results)

                            })

                    })

            } else {
                res.send("Invalid Order")
            }

        })
        .catch((err) => {
            console.error(err)
            res.send("Unable to get results. Error: " + err)
        })
})


app.delete('/order/:id', (req, res) => {
    Order.findOneAndRemove(req.param.id)
        .then((order) => {
            res.send("Order removed successfully")
        })
        .catch((err) => {
            res.send("Unable to get results. Error: " + err)
        })
})



app.listen(PORT, () => {
    console.log(`${APP_NAME} service running on port ${PORT}`)
})
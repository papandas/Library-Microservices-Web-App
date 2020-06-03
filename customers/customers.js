const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
// enviroment variable
const { MONGO_DB_URL, APP_NAME, PORT } = require("./config");

require("./customer.js");
const Customer = mongoose.model("Customer");

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

app.post('/customer', (req, res) => {


    let newCustomer = {
        name: req.body.name,
        age: req.body.age,
        address: req.body.address
    }

    let customer = new Customer(newCustomer)

    customer.save()
        .then(() => {
            console.log("New customer created!")
            res.send("New customer created!")
        })
        .catch((err) => {
            console.error(err)
            res.send("unable to create customer. Error: " + err)
        })
})


app.get('/customers', (req, res) => {
    Customer.find()
        .then((customers) => {
            res.json(customers)
        })
        .catch((err) => {
            console.error(err)
            res.send("Unable to get results. Error: " + err)
        })
})

app.get('/customer/:id', (req, res) => {
    Customer.findById(req.params.id)
        .then((customer) => {
            res.json(customer)
        })
        .catch((err) => {
            console.error(err)
            res.send("Unable to get results. Error: " + err)
        })
})


app.delete('/customer/:id', (req, res) => {
    Customer.findOneAndRemove(req.param.id)
        .then((customer) => {
            res.send("Customers removed successfully")
        })
        .catch((err) => {
            res.send("Unable to get results. Error: " + err)
        })
})



app.listen(PORT, () => {
    console.log(`${APP_NAME} service running on port ${PORT}`)
})
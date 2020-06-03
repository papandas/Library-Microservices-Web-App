let BOOKS_URI = "http://localhost:3001";
let CUSTOMERS_URI = "http://localhost:3002";
let PORT = 3003;
let APP_NAME = "Orders App";
let MONGO_DB_URL = "mongodb://127.0.0.1:27017/ordersservice";

if (process.env.PORT) {
    PORT = process.env.PORT;
}

if (process.env.APP_NAME) {
    APP_NAME = process.env.APP_NAME;
}

if (process.env.MONGO_DB_URL) {
    MONGO_DB_URL = process.env.MONGO_DB_URL;
}

if (process.env.BOOKS_URI) {
    BOOKS_URI = process.env.BOOKS_URI;
}

if (process.env.CUSTOMERS_URI) {
    CUSTOMERS_URI = process.env.CUSTOMERS_URI;
}

module.exports = {
    PORT,
    APP_NAME,
    MONGO_DB_URL,
    BOOKS_URI,
    CUSTOMERS_URI
};
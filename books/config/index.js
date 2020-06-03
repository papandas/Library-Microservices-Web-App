let PORT = 3001;
let APP_NAME = "Books App";
let MONGO_DB_URL = "mongodb://127.0.0.1:27017/booksservice";

if (process.env.PORT) {
    PORT = process.env.PORT;
}

if (process.env.APP_NAME) {
    APP_NAME = process.env.APP_NAME;
}

if (process.env.MONGO_DB_URL) {
    MONGO_DB_URL = process.env.MONGO_DB_URL;
}

module.exports = {
    PORT,
    APP_NAME,
    MONGO_DB_URL
};
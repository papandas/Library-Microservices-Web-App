const mongoose = require('mongoose');

mongoose.model("Customer", {
    name: {
        type: String,
        require: true
    },
    age: {
        type: Number,
        require: false
    },
    address: {
        type: String,
        require: false
    },
    createdOn: {
        type: Date,
        default: Date.now
    }
});
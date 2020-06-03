const mongoose = require('mongoose');

mongoose.model("Order", {
    CustomerID: {
        type: mongoose.SchemaTypes.ObjectId,
        require: true
    },
    BookID: {
        type: mongoose.SchemaTypes.ObjectId,
        require: true
    },
    initialDate: {
        type: Date,
        require: true
    },
    deliveryDate: {
        type: Date,
        require: true
    }
});
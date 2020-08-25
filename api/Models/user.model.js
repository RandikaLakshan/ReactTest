const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define collection and schema for product
let user = new Schema({
    first_name: {
        type: String
    },
    last_name: {
        type: String
    },
    email: {
        type: String
    },

    phone: {
        type: String
    },
    address: {
        type: String
    },
    password:{

        type:String
    }
}, {
    collection: 'user'
});

module.exports = mongoose.model('user', user);
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define collection and schema for product
let product = new Schema({
  name: {
    type: String
  },
  description: {
    type: String
  },
  quantity: {
    type:String
  },
  
  user_id:{
    type:String
  }
},{
    collection: 'product'
});

module.exports = mongoose.model('product', product);
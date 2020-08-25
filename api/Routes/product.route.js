
const express = require('express');
const productRoutes = express.Router();
const jwt= require('jsonwebtoken');

// Require product model in our routes module
let Product = require('../Models/product.model');
const { JsonWebTokenError } = require('jsonwebtoken');

// get products to logged user
productRoutes.route('/:id').get(verifyToken,function (req, res) {
  jwt.verify(req.token,"somesupersecretkey",(err,data)=>{

  if (err){
    res.json({'error':err})
  }
  else{
  Product.find({ user_id: req.params.id }, function (err, products) {
    if (err) {
      res.status(400).json({ 'error': err })
    }
    else {
      res.status(200).json(products);
    }
  });
}
  });
});

// get one products details
productRoutes.route('/edit/:id').get(verifyToken,function (req, res) {
  jwt.verify(req.token,"somesupersecretkey",(err,data)=>{

  let id = req.params.id;
  if (err){
    res.json({'error':err})
  }
  else{
  Product.findById(id, function (err, product) {
    if (err) {
      res.status(400).json()
    }
    else {
      if (!product) {

        res.status(404).send({ 'message': 'data not found' })
      }
      else {
        res.status(200).json(product);
      }
    }


  });
}});
});

//  update a product
productRoutes.route('/update/:id').post(verifyToken,function (req, res) {
  jwt.verify(req.token,"somesupersecretkey",(err,data)=>{

  if (err){
    res.json({'error':err})
  }
  else{
  Product.findById(req.params.id, function (err, product) {
   
    if (err){
      res.json({'error':err})
    }
    else{
    if (!product)
      res.status(404).send("data is not found");
    else {
      product.name = req.body.name;
      product.description = req.body.description;
      product.quantity = req.body.quantity;

      product.save().then(product => {
        res.json('Update complete');
      })
        .catch(err => {
          res.status(400).send("unable to update the database");
        });
      }
    }
  });
}});
});


//delete a product
productRoutes.route('/delete/:id').get(verifyToken,function (req, res) {
  jwt.verify(req.token,"somesupersecretkey",(err,data)=>{
  if (err){
    res.json({'error':err})
  }else{
  
  Product.findByIdAndRemove({ _id: req.params.id }, function (err, product) {
    if (err)
      res.json(err);
    else res.json('Successfully removed');
  });
}})
});

productRoutes.route('/add').post(verifyToken,function (req, res) {
  let product = new Product(req.body);
  jwt.verify(req.token,"somesupersecretkey",(err,data)=>{

    if (err){
      res.json({'error':err})
    }
    else{
      product.save()
      .then(product => {
        res.status(200).json({ 'product': 'product is added successfully' });
      })
      .catch(error => {
        res.status(400).json({'err':error});
      });
    }
  })
  
});
function verifyToken(req,res,next){
 

  if(typeof(req.headers['authorization']) != 'undefined' && req.headers[' authorization']!='undefined'){
    
    var headerToken=req.headers['authorization'].split(' ')[1];
  if(headerToken!=='undefined'){
    req.token=headerToken;
    next();
  }
  else{
    res.json({'message':"Unauthorized Request"})
  
}
  }
  else{
    res.json({'message':"Unauthorized Request"})
  }
}

module.exports = productRoutes;

const express = require('express');
const userRoutes = express.Router();

let User = require('../Models/user.model');
const bcrypt = require('bcryptjs');


// Defined store users
userRoutes.route('/add').post(function (req, res) {

  bcrypt.hash(req.body.password, 12, function (err, hash) {
    if (err) {
      res.json({'eroor':err})
    } else {
      let user = new User({


        first_name: req.body.first_name,
        last_name: req.body.last_name,
        phone: req.body.phone,
        email: req.body.email,
        address: req.body.address,
        password: hash

      }

      );

      user.save()
        .then(user => {
          res.status(200).json({ 'user': 'user is added successfully' });
        })
        .catch(err => {
          res.status(400).json({'err':err});
        });
    }
  })

});

//validate user registration
userRoutes.route('/findById/:email').get(function (req, res) {
  User.findOne({ email: req.params.email }, function (err, user) {
    
    if (err) {

      res.status(404).json({ 'error': err })
    }
    else {
      if (!user) {
        res.json({ 'status': 'empty' })
      
        
      }
      else {
        res.json({ 'status': 'noEmpty' });
      }
    }
  });
});


// Defined edit route
userRoutes.route('/all').get(function (req, res) {
  let id = req.params.id;
  User.find(function (err, user) {
    if (err) {

      res.status(404).json({ 'error': err })
    }
    else {
      if (!user) {
        res.status(400).json({ 'status': 'no user found' })
      
        
      }
      else {
        res.status(200).json({user});
      } 
       }
    });
});


module.exports = userRoutes;

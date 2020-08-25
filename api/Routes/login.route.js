const express = require('express')
const loginRoute = express.Router()
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../Models/user.model')

//login API
loginRoute.route('/loginUser').post(function (req, res) {

    let userToken;

    //checking the email is exist or not
    return User.findOne({ email: req.body.email })
        .then(user => {
            if (!user) {
                return res.json({ message: "Invalid Email" })

            }
            userToken = user

            return bcrypt.compare(req.body.password, user.password)
        })

        //checking the password if the email exists
        .then(isEqual => {
            if (!isEqual) {
                return res.json({ message: "Password is incorrect" })

            }

            const token = jwt.sign({ _id: userToken._id, email: userToken.email }, 'somesupersecretkey', {
                expiresIn: '1h'
            });
           

            return res.send({ userId: userToken._id, email: userToken.email, token: token, tokenExpiration: 1 })
        }).catch(err => {

            res.json({ 'error': err })
        })

});


module.exports = loginRoute;
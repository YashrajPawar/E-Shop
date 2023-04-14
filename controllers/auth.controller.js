const User = require('../models/user.model')
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken')
const secretConfig = require('../config/auth.config')

async function signup(req, res) {


    const userObj = {
        password: bcrypt.hashSync(req.body.password, 10),
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        contactNumber: req.body.contactNumber,
        role:req.body.role
    }

    const existingUser = await User.findOne({ email: userObj.email });
    if (existingUser) {
        return res.status(400).json({
            message: 'Try any other email, this email is already registered!'
        })
    }


    const emailValidation = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    if (!emailValidation.test(userObj.email)) {
        return res.status(400).json({
            message: 'Invalid email-id format!'
        });
    }


    const contactValidation = /^[0-9]{10}$/;
    if (!contactValidation.test(userObj.contactNumber)) {
        return res.status(400).json({
            message: 'Invalid contact number!'
        });
    }



    try {
        const user = await User.create(userObj)

        res.status(200).send({
            _id: user._id,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email
        })
    } catch (err) {
        console.log(err.message);
        res.status(500).send({
            message: 'Internal Server Error'
        })
    }
}


async function login(req, res) {
    const user = await User.findOne({ email: req.body.email })

    if (!user) {
        res.status(400).json({
            message: 'This email has not been registered!'
        })
    }

    if (!bcrypt.compareSync(req.body.password, user.password)) {
        res.status(400).json({
            message: 'Invalid Credentials!'
        })
    }

    const token = jwt.sign({ email: user.email }, secretConfig.secretKey)

    return res.set('x-access-token', token).status(200).send({
        email: user.email,
        name: `${user.firstName} ${user.lastName}`,
        isAuthenticated: true,
    })


} 

module.exports = {
    signup: signup,
    login: login
}
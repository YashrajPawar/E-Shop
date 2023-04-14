const Address = require('../models/address.model');
const User = require('../models/user.model');



/**
 * 
 * API endpoints for getting shipping address 
 */
async function shippingAddress(req, res) {


    const userEmail = await User.findOne({
        email: req.email
    })


    const shippingResponse = {
        name: req.body.name,
        contactNumber: req.body.contactNumber,
        city: req.body.city,
        landmark: req.body.landmark,
        street: req.body.street,
        state: req.body.state,
        zipcode: req.body.zipcode,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        user: userEmail
    }


    try {

        /**
         * to check if contact number has 10 digits or not 
         */
        const contactValidation = /^\d{10}$/;
        if (!contactValidation.test(req.body.contactNumber)) {
            return res.status(400).json({
                message: 'Invalid contact number!'
            });
        }


        // Validate the zip code format
        const regex = /^\d{6}$/;
        if (!regex.test(req.body.zipcode)) {
            res.status(400).json({ message: 'Invalid zip code!' });
            return;
        }

        const addressObj = await Address.create(shippingResponse);

        res.status(200).send(shippingResponse);


    } catch (err) {

        console.log(err.message)
        return res.status(500).send({
            message: 'Internal server error'
        })

    }
}

module.exports = {
    shippingAddress: shippingAddress,
}
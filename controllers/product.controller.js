const Product = require('../models/product.model');
const constants = require('../utils/constants');
const User = require('../models/user.model');



/**
 * 
 * API to create a product 
 */
async function createProduct(req, res) {


    const accessToken = req.headers['x-access-token'];

    // Check if the access token is provided
    if (!accessToken) {
        return res.status(401).send({
            message: 'Please Login first to access this endpoint!'
        });
    }

    const productObj = {
        name: req.body.name,
        category: req.body.category,
        price: req.body.price,
        description: req.body.description,
        manufacturer: req.body.manufacturer,
        availableItems: req.body.availableItems,
        imageURL: req.body.imageURL
    }

    try {


        //check for which user logged in
        const loggedUser = await User.findOne({
            email: req.email
        })

        //if user is not an ADMIN then he cannot excess endpoint
        if (loggedUser.role != constants.userType.admin) {

            return res.status(401).send({
                message: 'You are not authorised to access this endpoint!'
            })

        }

        const newProduct = await Product.create(productObj);
        res.status(200).send(newProduct);

    } catch (err) {

        console.log(err.message)
        return res.status(500).send({
            message: 'Internal server error'
        })

    }
}



/**
 * 
 * API to get list of products
 */
async function getProduct(req, res) {

    /**
     * check for category,directions,name,sortby fields if not given then select default fields
     * by given values
     */
    const category = req.query.category || "";
    const direction = req.query.direction || "DESC";
    const name = req.query.name || "";
    const sortBy = req.query.sortBy || "productId";

    const sortDir = (direction === "ASC") ? 1 : -1;

    try {
        const products = await Product.find({
            category: new RegExp(category, "i"),
            name: new RegExp(name, "i")
        }).sort({ [sortBy]: sortDir });

        res.status(200).json({
            content: products
        });
    } catch (err) {
        console.error("Error searching products:", err);
        res.status(500).json({ message: "Internal server error" });
    }

}


/**
 * 
 *API end points to get products by Id
 */
async function getProductById(req, res) {

    try {

        const product = await Product.findOne({
            productId: req.params.id
        })

        if (!product) {
            return res.status(200).send({
                message: `No product found for ID ${req.params.id}`
            })
        }

        return res.status(200).send(product);

    } catch (err) {

        console.log(err.message)
        return res.status(500).send({
            message: 'Internal server error'
        })

    }
}

/**
 *
 * API endpoints to update product by details
 */
async function updateProductDetails(req, res) {

    const accessToken = req.headers['x-access-token'];

    // Check if the access token is provided
    if (!accessToken) {
        return res.status(401).send({
            message: 'Please Login first to access this endpoint!'
        });
    }

    try {

        const loggedUser = await User.findOne({
            email: req.email
        })

        // check if logged user is ADMIN or not 
        if (loggedUser.role != constants.userType.admin) {

            return res.status(401).send({
                message: 'You are not authorised to access this endpoint!'
            })

        }

        const product = await Product.findOne({
            productId: req.params.id
        })


        if (!product) {
            return res.status(200).send({
                message: `No product found for ID ${req.params.id}`
            })
        }

        /**
         * required details an admin can update
         */
        product.name = req.body.name != undefined ? req.body.name : product.name;
        product.availableItems = req.body.availableItems != undefined ? req.body.availableItems : product.availableItems;
        product.price = req.body.price != undefined ? req.body.price : product.price;
        product.category = req.body.category != undefined ? req.body.category : product.category;
        product.description = req.body.description != undefined ? req.body.description : product.description;
        product.imageURL = req.body.imageURL != undefined ? req.body.imageURL : product.imageURL;
        product.manufacturer = req.body.manufacturer != undefined ? req.body.manufacturer : product.manufacturer;

        const updatedProduct = await product.save();
        return res.status(200).send(updatedProduct);


    } catch (err) {

        console.log(err.message)
        return res.status(500).send({
            message: 'Internal server error'
        })

    }
}


/**
 * 
 * API end point to delete an product 
 */
async function deleteProduct(req, res) {

    const accessToken = req.headers['x-access-token'];

    // Check if the access token is provided
    if (!accessToken) {
        return res.status(401).send({
            message: 'Please Login first to access this endpoint!'
        });
    }


    try {

        const loggedUser = await User.findOne({
            email: req.email
        })

        if (loggedUser.role != constants.userType.admin) {

            return res.status(401).send({
                message: 'You are not authorised to access this endpoint!'
            })

        }

        const product = await Product.findOne({
            productId: req.params.id
        })


        if (!product) {
            return res.status(200).send({
                message: `No product found for ID ${req.params.id}`
            })
        }

        const deleteProduct = await Product.findOneAndRemove({
            productId: req.params.id
        });
        return res.status(200).send({
            message: `Product with ${req.params.id} deleted successfully`
        });



    } catch (err) {

        console.log(err.message)
        return res.status(500).send({
            message: 'Internal server error'
        })

    }

}

module.exports = {
    createProduct: createProduct,
    getProduct: getProduct,
    getProductById: getProductById,
    updateProductDetails: updateProductDetails,
    deleteProduct: deleteProduct,
}
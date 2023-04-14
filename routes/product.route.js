const productController = require('../controllers/product.controller')
const authMiddleware = require('../middlewares/auth.middleware');
const verifyReqBody = require('../middlewares/verifyAddressBody');
module.exports = function (app) {

    app.post('/products', authMiddleware.verifyToken, productController.createProduct);
    app.get('/products', productController.getProduct);
    app.get('/products/:id', productController.getProductById);
    app.put('/products/:id', [authMiddleware.verifyToken, verifyReqBody.verifyReqBody], productController.updateProductDetails);
    app.delete('/products/:id', authMiddleware.verifyToken, productController.deleteProduct);
}
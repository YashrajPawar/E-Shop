const authMiddleware = require('../middlewares/auth.middleware');
const shippingController = require('../controllers/shippingAddress.controller')
const verifyReqBody = require('../middlewares/verifyAddressBody')


module.exports = function (app) {
    app.post('/addresses', [authMiddleware.verifyToken, verifyReqBody.verifyReqBody], shippingController.shippingAddress);
}
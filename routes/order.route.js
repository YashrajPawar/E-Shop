const authMiddleware = require('../middlewares/auth.middleware');
const orderController = require('../controllers/order.controller');

module.exports = function (app) {
    app.post('/orders', authMiddleware.verifyToken, orderController.placeOrder);
} 
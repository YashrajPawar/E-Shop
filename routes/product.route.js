const productController=require('../controllers/product.controller')
const authMiddleware=require('../middlewares/auth.middleware');

module.exports=function (app){

    app.post('/products',authMiddleware.verifyToken,productController.createProduct);
    app.get('/products',productController.getProduct);
    app.get('/products/:id',productController.getProductById);
}
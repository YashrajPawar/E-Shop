const authController = require('../controllers/auth.controller')


module.exports = function (app) {
    app.post('/users', authController.signup);
    app.post('/auth', authController.login);
}
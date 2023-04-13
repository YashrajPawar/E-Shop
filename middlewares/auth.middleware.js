const jwt = require('jsonwebtoken');
const config = require('../config/auth.config');


function verifyToken(req, res, next) {

    let token = req.headers['x-access-token'];
    console.log(token);
    if (!token) {
        res.status(403).send({
            message: 'No Token Provided'
        })
    }


    jwt.verify(token, config.secretKey, (err, decoded) => {
        if (err) {
            res.status(401).send({
                message: 'Unauthorised'
            })
        }
        console.log(decoded)
        req.email = decoded.email;
        next();
    })
}


module.exports = {
    verifyToken: verifyToken,
}
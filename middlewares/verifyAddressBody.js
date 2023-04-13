
function verifyReqBody(req, res, next) {


    if (!req.body.name) {
        res.status(400).send({
            message: 'Name cannot be empty'
        })
    }

    if (!req.body.street) {
        res.status(400).send({
            message: 'Street cannot be empty'
        })
    }

    if (!req.body.state) {
        res.status(400).send({
            message: 'State cannot be empty!'
        })
    }

    if (!req.body.city) {
        res.status(400).send({
            message: 'City cannot be empty'
        })
    }

}

module.exports = {
    verifyReqBody: verifyReqBody,
}
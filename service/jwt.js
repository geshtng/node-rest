const expressJwt = require('express-jwt')

module.exports = () => {
    const { secret } = require('../config')

    return expressJwt({ secret: secret, algorithms: ['HS256'] }).unless({
        path: [
            '/login',
            '/register',
            '/generate_default_admin'
        ]
    })
}
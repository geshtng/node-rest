const User = require('../core/user/user')

const ROLE_ADMIN = 'admin'

exports.isAdmin = (req, res, next) => {
    if (req.user.role !== ROLE_ADMIN) {
        return res.sendStatus(401)
    }

    next()
}

module.exports = (app) => {
    /* Handle GET */

    // User
    app.get('/user/get_all', this.isAdmin, User.getAll)
    app.get('/user/get_by_id/:_id', User.getById)

    //--------------------------------------------------

    /* Handle POST */

    // User
    app.post('/user/create', this.isAdmin, User.create)
    app.post('/user/update/:_id', this.isAdmin, User.update)
    app.post('/user/delete', this.isAdmin, User.delete)

    // Authorization
    app.post('/generate_default_admin', User.generateDefaultAdmin)
    app.post('/login', User.login)
    app.post('/register', User.register)
}

const User = require('../core/user/user')

const ROLE_ADMIN = 'admin'

exports.isAdmin = (req, res, next) => {
    if (req.user.role !== ROLE_ADMIN) {
        return res.sendStatus(401)
    }

    next()
}

module.exports = (app) => {
    app.get('/users', this.isAdmin, User.getAll)
    app.get('/users/:_id', User.getById)

    app.post('/users/create', this.isAdmin, User.create)

    app.put('/users/update/:_id', this.isAdmin, User.update)

    app.post('/users/delete', this.isAdmin, User.delete)

    // Authorization
    app.post('/generate_default_admin', User.generateDefaultAdmin)
    app.post('/login', User.login)
    app.post('/register', User.register)
}

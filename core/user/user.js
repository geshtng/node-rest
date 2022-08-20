const jwtSimple = require('jwt-simple')

const User = require('./init')
const { secret } = require('../../config')

const ROLE_USER = 'user'
const ROLE_ADMIN = 'admin'

function createToken(data) {
    var currentTime = Math.round(Date.now() / 1000)
    var expire = currentTime + 7 * 86400

    return jwtSimple.encode({
        sub: data._id,
        role: data.role,
        iss: 'node-rest',
        iat: currentTime,
        exp: expire
    }, secret)
}

exports.create = (req, res) => {
    var param = req.body
    var query = param

    query.created_at = new Date()
    query.created_by = req.user.sub

    User.create(query)
    .then(data => {
        return res.status(201).send(data)
    })
    .catch(err => {
        console.error(`[Core][User][create] ${err}`)

        return res.status(500).send(err)
    })
}

exports.getAll = (req, res) => {
    User.find()
    .then(data => {
        return res.status(200).send(data)
    })
    .catch(err => {
        console.error(`[Core][User][getAll] ${err}`)

        return res.status(500).send(err)
    })
}

exports.getById = (req, res) => {
    var id = req.params

    if (req.user.role === ROLE_USER && (req.params._id !== req.user.sub)) {
        return res.sendStatus(401)
    }

    User.findById(id)
    .then(data => {
        if (!data) {
            return res.status(404).send({
                message: 'User data not found!'
            })
        }

        return res.status(200).send(data)
    })
    .catch(err => {
        console.error(`[Core][User][getById] ${err}`)

        return res.status(500).send(err)
    })
}

exports.update = (req, res) => {
    var id = req.params
    var param = req.body
    var query = param

    query.updated_at = new Date()
    query.updated_by = req.user.sub

    User.updateOne(id, query)
    .then(data => {
        return res.status(200).send(data)
    })
    .catch(err => {
        console.error(`[Core][User][update] ${err}`)

        return res.status(500).send(err)
    })
}

exports.delete = (req, res) => {
    var id = req.params

    User.deleteOne(id)
    .then(data => {
        return res.status(200).send(data)
    })
    .catch(err => {
        console.error(`[Core][User][delete] ${err}`)

        return res.status(500).send(err)
    })
}


exports.login = (req, res) => {
    const { username, password } = req.body

    User.findOne({ username: username })
    .then(data => {
        if (!data) {
            return res.status(404).send({
                message: 'Wrong username!'
            })
        }

        data.comparePassword(password, (err, match) => {
            if (err) {
                console.error(`[Core][User][login] ${err}`)

                return res.status(500).send(err)
            }

            if (!match) {
                return res.status(500).send({
                    message: 'Wrong password!'
                })
            }

            return res.status(200).send({
                fullname: data.fullname,
                username: data.username,
                role: data.role,
                token: createToken(data)
            })
        })
    })
    .catch(err => {
        console.error(`[Core][User][login] ${err}`)

        return res.status(500).send(err)
    })
}

exports.register = (req, res) => {
    const param = req.body
    var query = param
    
    query.role = ROLE_USER
    query.created_at = new Date()

    User.create(query)
    .then(data => {
        return res.status(201).send({
            data,
            token: createToken(data)
        })
    })
    .catch(err => {
        console.error(`[Core][User][register] ${err}`)

        return res.status(500).send(err)
    })
}

exports.generateDefaultAdmin = (req, res) => {
    var adminData = {
        fullname: 'Admin',
        username: 'admin',
        password: 'password',
        role: 'admin',
        created_at: new Date()
    }

    User.create(adminData)
    .then(data => {
        return res.status(201).send(data)
    })
    .catch(err => {
        console.error(`[Core][User][generateDefaultAdmin] ${err}`)

        return res.status(500).send(err)
    })
}

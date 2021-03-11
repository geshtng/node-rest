const mongoose = require('mongoose')
const nanoid = require('nanoid')
const bcrypt = require('bcrypt')

const userSchema = mongoose.Schema({
    _id: {
        type: String,
        default: nanoid.customRandom(nanoid.urlAlphabet, 10, nanoid.random)
    },
    fullname: String,
    username: {
        type: String,
        unique: true
    },
    password: String,
    role: {
        type: String,
        default: 'user'
    },
    created_at: Number,
    created_by: String,
    updated_at: Number,
    updated_by: String
}, { versionKey: false })

userSchema.pre('save', function (next) {
    if (!this.isModified('password')) {
        return next()
    }

    this.password = bcrypt.hashSync(this.password, 10)
    next()
})

userSchema.methods.comparePassword = function (password, callback) {
    return callback(null, bcrypt.compareSync(password, this.password))
}

const User = mongoose.model('user', userSchema)

module.exports = User

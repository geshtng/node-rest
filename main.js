const express = require('express')
const mongoose = require('mongoose')

const { database, port } = require('./config')
const api = require('./service/api')
const jwt = require('./service/jwt')

const app = express()

mongoose.connect(database, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true })

app.use(express.json({ type: '*/json' }))
app.use(express.urlencoded({ extended: false }))
app.use(jwt())

api(app)

app.use((err, req, res, next) => {
    if (err.name === 'UnauthorizedError') {
        return res.status(err.status).send({
            message: err.message
        })
    }

    next()
})

app.listen(port, () => {
    console.log(`Server running at port ${port}`)
})
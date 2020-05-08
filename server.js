const express = require('express')
const projRouter = require('./routers/projRouter')
const actRouter = require('./routers/actRouter')

const server = express()

server.use(express.json())
server.use('/api/proj', projRouter)
server.use('/api/act', actRouter)

server.get('/', (req, res) => {
    res.send(`<h1>Running</h1>`)
})

module.exports = server
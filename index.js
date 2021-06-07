'use strict'

let path = require('path')
let express = require('express')
let app = express()
let mainRouter = require('./mainRoutes')

app.use(mainRouter)
app.listen(3000)
console.log('Express server running on port 3000')

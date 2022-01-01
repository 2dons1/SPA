const express = require('express')
const serveStatic = require('serve-static')
const path = require('path')
const PORT = process.env.PORT || 3000

express()
    .use('/', serveStatic(path.join(__dirname, '/dist')))
    .get(/.*/, function (req, res) {
        res.sendFile(path.join(__dirname, '/dist/index.html'))
    })
    .listen(PORT, () => console.log(`Listening on ${ PORT }`))
    
    
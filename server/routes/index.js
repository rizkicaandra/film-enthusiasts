const router = require('express').Router()
const filmRouter = require('./film')

router.use('/', filmRouter)

module.exports = router
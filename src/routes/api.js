const express = require('express')
const userRoutes = require('./users')
const siteRoutes = require('./sites')

const router = express.Router()

router.use('/users', userRoutes)
router.use('/sites', siteRoutes)

module.exports = router

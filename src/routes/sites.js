const express = require('express')
const { sitesController } = require('../controllers/index')

const router = express.Router()

router.get('/', sitesController.index)

router.post('/', sitesController.store)

router.get('/:id', sitesController.show)

router.delete('/:id', sitesController.destroy)

router.put('/:id', sitesController.update)

module.exports = router

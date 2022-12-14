const express = require('express')
const router = express.Router()
const ctrlContact = require('../controller/index')
const { addContactValidation, updateContactValidation } = require('../middlewares/validationMiddlewares')

router.get('/contacts', ctrlContact.get)

router.get('/contacts/:id', ctrlContact.getById)

router.post('/contacts', addContactValidation, ctrlContact.create)

router.put('/contacts/:id', updateContactValidation, ctrlContact.update)

router.patch('/contacts/:id/favorite', ctrlContact.updateFavorite)

router.delete('/contacts/:id', ctrlContact.remove)

module.exports = router;
const express = require('express')
const router = express.Router()
const ctrlContact = require('../controller/contacts')
const { addContactValidation, updateContactValidation } = require('../middlewares/validationMiddlewares')

router.get('/', ctrlContact.get)

router.get('/:id', ctrlContact.getById)

router.post('/', addContactValidation, ctrlContact.create)

router.put('/:id', updateContactValidation, ctrlContact.update)

router.patch('/:id/favorite', ctrlContact.updateFavorite)

router.delete('/:id', ctrlContact.remove)

module.exports = router;
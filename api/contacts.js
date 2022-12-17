const express = require('express')
const router = express.Router()
const ctrlContact = require('../controller/contacts')
const { addContactValidation, updateContactValidation } = require('../middlewares/validationMiddlewares')
const { auth } = require('../middlewares/auth')

router.get('/', auth, ctrlContact.get)

router.get('/:id', auth, ctrlContact.getById)

router.post('/', auth, addContactValidation, ctrlContact.create)

router.put('/:id', auth, updateContactValidation, ctrlContact.update)

router.patch('/:id/favorite', auth, ctrlContact.updateFavorite)

router.delete('/:id', auth, ctrlContact.remove)

module.exports = router;
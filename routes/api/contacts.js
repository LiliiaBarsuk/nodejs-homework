const express = require('express')
const Joi = require('joi');

const router = express.Router()

const contactsOperations = require("../../models/contacts")

const addContactSchema = Joi.object(
  {
    name: Joi.string().required(),
    email: Joi.string().required(),
    phone: Joi.string().required(),
  }
);

const updateContactSchema = Joi.object(
  {
    name: Joi.string(),
    email: Joi.string(),
    phone: Joi.string(),
  }
).min(1);

router.get('/', async (req, res, next) => {
  const contacts = await contactsOperations.listContacts();
  res.json({
    status: "200",
    data: {contacts} });
});

router.get('/:contactId', async (req, res, next) => {
  const { contactId } = req.params;
  const contact = await contactsOperations.getContactById(contactId);
  if (!contact) {
    res.status(404).json({ message: "Not found"})
  }
  res.json({ 
    data: {contact},
    status: "200"
     })
});

router.post('/', async (req, res, next) => {
  const {error} = addContactSchema.validate(req.body);
  if (error) {
    res.status(400).json({message: "missing required name field"});
  } 
  const result = await contactsOperations.addContact(req.body)
  res.status(201).json({ data: {result} })
});

router.delete('/:contactId', async (req, res, next) => {
  const { contactId } = req.params;
  const deletedContact = await contactsOperations.removeContact(contactId);
  if(!deletedContact) {
    res.status(404).json({message: "Not found"});

  }
  res.json({ message: 'contact deleted' })
});

router.put('/:contactId', async (req, res, next) => {
  const {error} = updateContactSchema.validate(req.body);
  if (error) {
    res.status(400).json({message: "missing fields"});
  } 
  const { contactId } = req.params;
  const result = await contactsOperations.updateContact(contactId, req.body)
  if (!result) {
    res.status(404).json({ message: "Not found"})
  }
  res.status(200).json({ data: {result} })
});

module.exports = router;

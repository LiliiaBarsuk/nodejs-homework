const service = require("../service/contacts");

const get = async (req, res, next) => {
  const {_id} = req.user;
  const {page = 1, limit = 20} = req.query;
  const skip = (page - 1) * limit;
  const limitParam = Number(limit);
    try {
      const results = await service.getAllContacts(_id,  skip, limitParam );
      res.json({
        status: 'success',
        code: 200,
        data: {
          contacts: results,
        },
      }) 
    } catch (e) {
      console.error(e)
      next(e)
    }
}

const getById = async (req, res, next) => {
    const { id } = req.params
    try {
      const result = await service.getContactById(id)
      if (result) {
        res.json({
          status: 'success',
          code: 200,
          data: { contact: result },
        })
      } else {
        res.status(404).json({
          status: 'error',
          code: 404,
          message: `Not found contact id: ${id}`,
          data: 'Not Found',
        })
      }
    } catch (e) {
      console.error(e)
      next(e)
    }
}

const create = async (req, res, next) => {
    const { name, emai, phone, favorite } = req.body
    const {_id} = req.user;
    try {
      const result = await service.createContact({ name, emai, phone, favorite, owner: _id })
  
      res.status(201).json({
        status: 'success',
        code: 201,
        data: { task: result },
      })
    } catch (e) {
      console.error(e)
      next(e)
    }
}

const update = async (req, res, next) => {
    const { id } = req.params;
    const {_id: ownerId } = req.user;
    const { name, emai, phone, favorite } = req.body
    try {
      const result = await service.updateContact(id, ownerId, { name, emai, phone, favorite })
      if (result) {
        res.json({
          status: 'success',
          code: 200,
          data: { contact: result },
        })
      } else {
        res.status(404).json({
          status: 'error',
          code: 404,
          message: `Not found contact id: ${id}`,
          data: 'Not Found',
        })
      }
    } catch (e) {
      console.error(e)
      next(e)
    }
}

const updateFavorite = async (req, res, next) => {
    const { id } = req.params;
    const { favorite } = req.body;
    const {_id: ownerId } = req.user;
    try {
      const result = await service.updateContact(id, ownerId, { favorite })
      if (result) {
        res.json({
          status: 'success',
          code: 200,
          data: { contact: result },
        })
      } else {
        res.status(404).json({
          status: 'error',
          code: 404,
          message: `Not found contact id: ${id}`,
          data: 'Not Found',
        })
      }
    } catch (e) {
      console.error(e)
      next(e)
    }
  }
  
  const remove = async (req, res, next) => {
    const { id } = req.params
    const {_id: ownerId } = req.user;
    try {
      const result = await service.removeContact(id, ownerId)
      if (result) {
        res.json({
          status: 'success',
          code: 200,
          data: { contact: result },
        })
      } else {
        res.status(404).json({
          status: 'error',
          code: 404,
          message: `Not found contact id: ${id}`,
          data: 'Not Found',
        })
      }
    } catch (e) {
      console.error(e)
      next(e)
    }
}
  
module.exports = {
    get,
    getById,
    create,
    update,
    updateFavorite,
    remove,
}
  
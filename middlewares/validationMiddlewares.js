const Joi = require('joi');

const addContactValidation = (req, res, next) => {

    const schema = Joi.object({
        name: Joi.string().required(),
        email: Joi.string().required(),
        phone: Joi.string().required(),
        favorite: Joi.boolean()
    })

    const { error } = schema.validate(req.body);
    if (error) {
        return res.status(400).json({ status: error.details });
      }
    next();


};
  
const updateContactValidation = (req, res, next) => {
    const schema = Joi.object({
        name: Joi.string(),
        email: Joi.string(),
        phone: Joi.string(),
        favorite: Joi.boolean()
    }).min(1)

    const { error } = schema.validate(req.body);
    if (error) {
        return res.status(400).json({ status: error.details });
      }

    next();
};

const authValidation = (req, res, next) => {
    const schema = Joi.object({
        email: Joi.string().required(),
        password: Joi.string().min(6).required(),
    })

    const { error } = schema.validate(req.body);

    if (error) {
      return res.status(400).json({
        status: "400 Bad Request",
        message: error.details
      });
    }
  
    next();
}; 

module.exports = {
    addContactValidation,
    updateContactValidation,
    authValidation
}
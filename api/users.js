const express = require('express')
const router = express.Router()
const ctrlUser = require('../controller/users')
const { authValidation } = require('../middlewares/validationMiddlewares')


router.post("/register", authValidation, ctrlUser.registerUser);
router.post("/login", authValidation, ctrlUser.loginUser);
// router.post("/logout", ctrlUser.register);



module.exports = router;
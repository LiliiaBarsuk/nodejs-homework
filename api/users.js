const express = require('express')
const router = express.Router()
const ctrlUser = require('../controller/users')
const { authValidation } = require('../middlewares/validationMiddlewares')
const { auth } = require('../middlewares/auth')

router.post("/register", authValidation, ctrlUser.registerUser);
router.post("/login", authValidation, ctrlUser.loginUser);
router.get("/current", auth, ctrlUser.getCurrent);



module.exports = router;
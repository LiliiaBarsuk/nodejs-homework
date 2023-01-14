const express = require('express')
const router = express.Router()
const ctrlUser = require('../controller/users')
const { authValidation } = require('../middlewares/validationMiddlewares')
const { auth } = require('../middlewares/auth')
const { upload } = require('../middlewares/upload')

router.post("/register", authValidation, ctrlUser.registerUser);
router.get("/verify/:verificationToken", ctrlUser.verifyEmail);
router.post("/verify/", ctrlUser.verifyRepeat);
router.post("/login", authValidation, ctrlUser.loginUser);
router.get("/current", auth, ctrlUser.getCurrent);
router.post("/logout", auth, ctrlUser.logOutUser);
router.patch("/avatars", auth, upload.single('avatar'), ctrlUser.changeAvatar);



module.exports = router;
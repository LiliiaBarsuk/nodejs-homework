const service = require("../service/users");
const bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken");
const dotenv = require('dotenv');
const User = require("../service/schemas/user");
const gravatar = require('gravatar');
const path = require('path');
const fs = require('fs/promises');
const Jimp = require('jimp');

dotenv.config();

const { SECRET_KEY } = process.env;

const registerUser = async (req, res, next) => {
    const {email, password} = req.body;
    const hashPassword = bcrypt.hashSync(password, bcrypt.genSaltSync(10));
    const avatarURL = gravatar.url(email);
    try { 
        const user = await service.findUser(email);
        if (user) {
            res.status(409).json({
                status: 'conflict',
                code: 409,
                message: "Email in use"});
        }

        const result = await service.register({email, password: hashPassword, avatarURL});     

        res.status(201).json({
        status: 'created',
        code: 201,
        user: {
            email: result.email,
            subscription: result.subscription,
            avatarURL
          },
      }) 
    } catch (e) {
      console.error(e)
      next(e)
    }
};

const loginUser = async (req, res, next) => {
    const {email, password} = req.body;
    
    try { 
    const user = await service.findUser(email);
    const passCompare = bcrypt.compareSync(password, user.password);

    if (!user || !passCompare) {
        res.status(401).json({
            status: 'unauthorized',
            code: 401,
            message: "Email or password is wrong"});
    }

    const payload = {
        id: user._id,
    }
    
    const token = jwt.sign(payload, SECRET_KEY, {expiresIn: '1h'});
    await User.findByIdAndUpdate(user._id, {token});
    res.status(200).json({
        status: 'success',
        code: 200,
        token: token,
        user: {
            email: user.email,
            subscription: user.subscription
        },
    }) 
    } catch (e) {
      console.error(e)
      next(e)
    }
};

const getCurrent = async (req, res, ) => {
    const {email, subscription} = req.user;

    res.json({
        status: "success",
        code: 200,
        data: {
            user: {
                email,
                subscription
            }
        }

    })

};

const logOutUser = async (req, res, next) => {
    const {_id} = req.user;      
    await User.findByIdAndUpdate(_id, {token: null})
};

const changeAvatar = async (req, res) => {
    const {path: tempUpload, originalname} = req.file;
    const {_id} = req.user;
    const imageName = `${_id}_${originalname}`;
        
    Jimp.read(tempUpload)
        .then(image => {
            return image
                .resize(250, 250) 
                .write(tempUpload); 
            })
        .catch(err => {
            console.error(err);
        });
    try {
        const resultUpload = path.join(__dirname, '../', 'public', 'avatars', imageName);
        await fs.rename(tempUpload, resultUpload);
        const avatarURL = path.join('public', 'avatars', imageName);
        await User.findByIdAndUpdate(_id, {avatarURL})

        res.json({
                status: "success",
                code: 200,
                data: {
                    avatarURL
                }
            })

    } catch(error) {
        await fs.unlink(tempUpload);
        throw error
    }

   
};

module.exports = {
    registerUser,
    loginUser,
    getCurrent,
    logOutUser,
    changeAvatar
};
  
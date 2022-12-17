const service = require("../service/users");
const bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken");
const dotenv = require('dotenv');

dotenv.config();

const { SECRET_KEY } = process.env;

const registerUser = async (req, res, next) => {
    const {email, password} = req.body;
    const hashPassword = bcrypt.hashSync(password, bcrypt.genSaltSync(10))
    try { 
        const user = await service.findUser(email);
        if (user) {
            res.status(409).json({
                status: 'conflict',
                code: 409,
                message: "Email in use"});
        }

        const result = await service.register({email, password: hashPassword});     

        res.status(201).json({
        status: 'created',
        code: 201,
        user: {
            email: result.email,
            subscription: result.subscription
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



module.exports = {
    registerUser,
    loginUser,
    getCurrent
};
  
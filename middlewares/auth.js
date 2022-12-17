// const { User } = require('../service/schemas/user');
const jwt = require('jsonwebtoken');
const createError = require('http-errors');
const { getUser } = require('../service/users');
require("dotenv").config();

const {SECRET_KEY} = process.env;

const auth = async(req, res, next) => {
    const {authorization = "" } = req.headers;
    const [bearer, token] = authorization.split(" ");

    try {
        if (bearer !== "Bearer") {
           next(createError(401, "Not authorized", { status: "Unauthorized" }))
        }
        const { id } = jwt.verify(token, SECRET_KEY);
       
        const user = await getUser(id);
         console.log(user);

        if(!user) {
           next(createError(401, "Not authorized", { status: "Unauthorized" }))
        }

        req.user = user;
        next();
    } catch (error) {
        if (error.message === "Invalid signature") { 
            error.status = 401;
        }
        next(error)
    } 
}

module.exports ={
    auth
}
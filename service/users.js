const User = require("./schemas/user");

const findUser = async(email) => {
    return User.findOne({ email: email })
}


const register = async({email, password}) => {
    return User.create({email, password }) 
}


module.exports = {
    findUser,
    register,
}
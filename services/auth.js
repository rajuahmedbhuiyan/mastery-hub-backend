const bcrypt = require('bcrypt'); 
const User = require("../models/User");
const error = require("../utils/error");
const { handleFormatUserResponse } = require("../utils/users");
const { handleGenerateJwtToken } = require('../utils/auth');



const loginUser = async ({ email, password }) => {
    if (!email || !password) throw error("Please provide email and password", 400)
    const user = await User.findOne({
        email
    });

    if (!user) {
        throw error("User not found", 400)

    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
        throw error("Wrong password", 401)
    }

    const userInfo = handleFormatUserResponse(user._doc); 
    const token =  handleGenerateJwtToken(userInfo);


    return {
        ...userInfo,
        token
    }
}


module.exports = {
    loginUser
}
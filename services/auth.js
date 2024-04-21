const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const error = require("../utils/error");



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
        throw error("Invalid password", 400)
    }

    const { password: p, ...userInfo } = user._doc;

    const token = jwt.sign({
        ...userInfo
    }, process.env.JWT_SECRET, {
        expiresIn: '24h'
    });
    return {
        ...userInfo,
        token
    }
}


module.exports = {
    loginUser
}
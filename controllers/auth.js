
const auth = require('../services/auth');
const userServices = require('../services/user');
const jwt = require('jsonwebtoken');


const loginUser = async (req, res) => {
    const { email, password } = req.body;
    try {

        const generatedToken = await auth.loginUser({ email, password });
        return res.status(200).json(generatedToken);

    }
    catch (err) {

        return res.status(err.status || 500).json({
            message: err.message,
            status: err.status
        });
    }
}


const registerUser = async (req, res) => {
    const { firstname, lastname, email, password, } = req.body;

    try {
        console.log("raju")
        const newUser = await userServices.createUsers({
            firstname,
            lastname,
            email,
            password,
        })

        const { password: p, ...userInfo } = newUser._doc;

        const token = jwt.sign({
            ...userInfo
        }, process.env.JWT_SECRET, {
            expiresIn: '24h'
        });


        return res.status(201).json({
            ...userInfo,
            token
        });
    } catch (err) {
        return res.status(err.status || 500).json({
            message: err.message,
            status: err.status
        });
    }

}


module.exports = {
    loginUser,
    registerUser
}
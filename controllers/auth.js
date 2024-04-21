
const auth = require('../services/auth');
const userServices = require('../services/user');
const jwt = require('jsonwebtoken');
const { handleFormatUserResponse } = require('../utils/users');
const { handleGenerateJwtToken } = require('../utils/auth');
const { handleSendResponse } = require('../utils/response');


const loginUser = async (req, res) => {
    const { email, password } = req.body;
    try {

        const generatedToken = await auth.loginUser({ email, password });

        return handleSendResponse({
            res,
            statusCode: 200,
            message: 'User logged in successfully',
            data: generatedToken
        })
 

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
        const newUser = await userServices.createUsers({
            firstname,
            lastname,
            email,
            password,
        })
        const userInfo = handleFormatUserResponse(newUser._doc); 

        const token = handleGenerateJwtToken(userInfo)

        return handleSendResponse({
            res,
            statusCode: 201,
            message: 'User created successfully',
            data: {
                ...userInfo,
                token
            }
        })

        
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
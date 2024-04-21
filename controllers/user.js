const User = require('../models/User');
const userServices = require('../services/user');
const bcrypt = require('bcrypt');
const error = require('../utils/error');


const getUsers = async (req, res,) => {
    try {
        const users = await userServices.getUsers();
        return res.status(200).json(users);
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
}


const createUser = async (req, res) => {
    const { firstname, lastname, email, password, roles, image, status, } = req.body;

  
    try {
       


        const newUser = await userServices.createUsers({
            firstname,
            lastname,
            email,
            password,
            image,
            status,
            roles,
        })





        return res.status(201).json(newUser);
    } catch (err) {
        return res.status(err.status || 500).json({ message: err.message });
    }

}


const getSingleUser = async (req, res) => {
    const { id } = req.params;
    try {
        const user = await User.findById(id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        const { password, ...data } = user._doc;
        return res.status(200).json(data);
    }
    catch (err) {
        return res.status(500).json({ message: err.message });
    }
}




module.exports = {
    getUsers,
    createUser,
    getSingleUser
}
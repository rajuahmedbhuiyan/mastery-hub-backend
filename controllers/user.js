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
        const user = await userServices.findUserByKey("_id", id)
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        const { password, ...data } = user._doc;
        return res.status(200).json(data);
    }
    catch (err) {
        return res.status(err.status || 500).json({
            message: err.message,
            status: err.status
        });
    }
}
const deleteUser = async (req, res) => {
    const { id } = req.params;
    try {
        const user = await userServices.findUserByKey("_id", id)
        if (!user) {
            throw error("User not found", 400)
        }
        await User.deleteOne({ _id: id });
        return res.status(200).json({ message: 'User deleted successfully' });
    }
    catch (err) {
        return res.status(err.status || 500).json({
            message: err.message,
            status: err.status
        });
    }
}


const updateUser = async (req, res) => {
    const { id } = req.params;
    const { firstname, lastname, email, image, } = req.body;
    try {
        const user = await userServices.findUserByKey("_id", id)
        if (!user) {
            throw error("User not found", 400)
        }



        if (email && email !== user.email) {
            const isUserAlreadyRegistered = await User.findOne({ email });
            if (isUserAlreadyRegistered) {
                throw error("User already registered", 400)
            }
        }




        const updatedUser = await User.updateOne({ _id: id }, {
            $set: {
                firstname,
                lastname,
                email,
                image
            }
        }, {
            runValidators: true
        });

        if (updatedUser.modifiedCount > 0) {
            const newUser = await userServices.findUserByKey("_id", id)
            const { password, ...data } = newUser._doc;

            return res.status(200).json({
                message: 'User updated successfully',
                value: data
            });
        } else {
            return res.status(500).json({
                message: 'User not updated! Maybe you did not make any changes!',
            });

        }
    }
    catch (err) {
        return res.status(err.status || 500).json({
            message: err.message,
            status: err.status
        });
    }
}




module.exports = {
    getUsers,
    createUser,
    getSingleUser,
    deleteUser,
    updateUser
}
const User = require('../models/user');
const userServices = require('../services/user');


const getUsers = async (req, res,) => {
    try {
        const users = await userServices.getUsers();
        res.status(200).json(users);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

 
module.exports = {
    getUsers
}
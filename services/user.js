const User = require('../models/User');
const bcrypt = require('bcrypt');
const error = require('../utils/error');


const getUsers = () => {
    return User.find()
}

const createUsers = async ({
    firstname,
    lastname,
    email,
    password,
    image,
    status,
    roles,
}) => {

    if (!firstname || !lastname || !email || !password) {
        throw error("Please provide all required fields", 400)
    }
    const isUserAlreadyRegistered = await User.findOne({ email });

    if (isUserAlreadyRegistered) {
        throw error("User already registered", 400)
    }

    if (password && password.length < 6) {
        throw error("Password is too short", 400)
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({
        firstname,
        lastname,
        email,
        password: hashedPassword,
        image,
        status,
        roles,
    });
    return user.save();

}


module.exports = {
    getUsers,
    createUsers
}

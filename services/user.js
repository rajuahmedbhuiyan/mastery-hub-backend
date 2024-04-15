const User = require('../models/user');

const getUsers =   (req, res, next) => {
     return User.find()
}


module.exports = {
    getUsers
}

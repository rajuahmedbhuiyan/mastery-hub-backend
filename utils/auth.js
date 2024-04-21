const { handleFormatUserResponse } = require("./users")
const jwt = require('jsonwebtoken');


const handleGenerateJwtToken = (user) => {
    const formatedUser = handleFormatUserResponse(user);

    return jwt.sign({
        ...formatedUser
    }, process.env.JWT_SECRET, {
        expiresIn: '365d'
    })
}


module.exports = {
    handleGenerateJwtToken
}

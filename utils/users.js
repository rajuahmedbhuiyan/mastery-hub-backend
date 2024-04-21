

const handleFormatUserResponse = (user) => {
    const { firstname, lastname, email, password, image, status, roles, _id } = user;
    return {
        id: _id,
        firstname,
        lastname,
        email,
        image,
        status,
        roles
    }
}


module.exports = {
    handleFormatUserResponse
}

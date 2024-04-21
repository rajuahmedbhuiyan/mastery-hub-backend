
const adminAccess = (req, res, next) => {
    const roles = req.user.roles;


    if (roles.includes("ROLE_OWNER") || roles.includes("ROLE_ADMIN")) {
        next()
    } else {
        res.status(403).json({
            message: "You are not authorized to access this route",
            status: 403
        })
    }

}


module.exports = {
    adminAccess
};
const router = require('express').Router()
const user = require('./user');
const auth = require('./auth');
const authenicate = require('../middleware/authenicate');



router.use(`/api/v1/users`, authenicate, user)
router.use(`/api/v1/auth`, auth)


module.exports = router
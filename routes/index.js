const router = require('express').Router()
const user = require('./user');
const auth = require('./auth');



router.use(`/api/v1/users`, user) 
router.use(`/api/v1/auth`, auth)


module.exports = router
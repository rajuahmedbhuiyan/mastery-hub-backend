const router = require('express').Router();
const userController = require('../controllers/user');





// this is the route for getting all users
router.get('/', userController.getUsers);


// this is the route for creating a user
router.post('/', userController.createUser); 

// this is the route for getting a single user

router.get('/:id', userController.getSingleUser);

module.exports = router;

const router = require('express').Router();
const userController = require('../controllers/user');





// this is the route for getting all users
router.get('/', userController.getUsers);


// this is the route for creating a user
router.post('/', userController.createUser); 

// this is the route for getting a single user

router.get('/:id', userController.getSingleUser);

// this is the route for deleteting a user 

router.delete('/:id', userController.deleteUser);

// this is the route for updating a user

router.put('/:id', userController.updateUser);

module.exports = router;

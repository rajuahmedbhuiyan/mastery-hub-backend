const router = require('express').Router();
const User = require('../models/user'); 
const userController = require('../controllers/user');
const bcrypt = require('bcrypt');



router.post('/user', async (req, res) => {

    const { firstname, lastname, email, password, roles, image, status, } = req.body;

    if (!firstname || !lastname || !email || !password) {
        return res.status(400).json({ message: 'Please provide all required fields' });
    }



    try {


        const isUserAlreadyRegistered = await User.findOne({ email });

        if (isUserAlreadyRegistered) {
            return res.status(400).json({ message: 'User already registered' });
        }

        if(password && password.length < 6){
            return res.status(400).json({ message: 'Password is too short' });
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


        const newUser = await user.save();
        res.status(201).json(newUser);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }


}
);


router.get('/user',  userController.getUsers);


module.exports = router;

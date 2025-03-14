const express = require('express');
const router = express.Router();
const userController= require('../Controllers/userControllers');
const {body} = require('express-validator')
const Middleware = require('../Middlewares/middleWares')

router.post('/register',
    [
        body('fullName.firstName').isLength({minLength:3}).trim().withMessage('Name must be at least 3 characters long'),
        body('email').isEmail().trim().normalizeEmail().withMessage('Please enter a valid email address'),
        body('password').isLength({minLength:8}).trim().withMessage('Password must be at least 8 characters long')
    ],
    userController.registerUser
)

router.post('/login',
    [
        body('email').isEmail().trim().normalizeEmail().withMessage('Please enter a valid email address'),
        body('password').isLength({minLength:8}).trim().withMessage('Password must be at least 8 characters long')
    ],
    userController.loginUser
)

router.get('/profile',Middleware.authUser, userController.getProfile);

router.get('/logout',Middleware.authUser, userController.logoutUser);

module.exports = router;
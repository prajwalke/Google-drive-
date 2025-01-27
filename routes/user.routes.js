const express = require('express');
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user.model'); // Ensure this path is correct

const router = express.Router();

router.post('/register',
    body('email').trim().isEmail().withMessage('Invalid email address'),
    body('password').isLength({ min: 5 }).withMessage('Password must be at least 5 characters long'),
    body('username').isLength({ min: 3 }).withMessage('Username must be at least 3 characters long'),
    async (req, res) => {
        console.log(req.body); // Debugging statement to log the request body

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array(), message: 'There was an error with the registration' });
        }

        const { username, email, password } = req.body;

        const hashPassword = bcrypt.hashSync(password, 10);

        const newUser = new User({
            username,
            email,
            password: hashPassword
        });

        try {
            await newUser.save();
            res.json(newUser);
        } catch (error) {
            res.status(500).json({ message: 'Error saving user', error });
        }
    }
);

router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        const isMatch = bcrypt.compareSync(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        const token = jwt.sign({
            userID: user._id,
            email: user.email,
            username: user.username
        }, process.env.JWT_SECRET, { expiresIn: '1h' });

        // Set the token as a cookie
        res.cookie('token', token, { httpOnly: true });

        res.json({ message: 'Login successful' });
    } catch (error) {
        res.status(500).json({ message: 'Error logging in', error });
    }
});

module.exports = router;
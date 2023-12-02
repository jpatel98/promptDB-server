const User = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const userController = {
    // Register a new user
    async register(req, res) {
        try {
            const { username, email, password } = req.body;

            // Check if user already exists
            let user = await User.findOne({ email });
            if (user) return res.status(400).send('User already exists.');

            // Create a new user
            user = new User({ username, email, password });
            await user.save();

            // Generate a token
            const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET);

            res.status(201).send({ token });
        } catch (error) {
            res.status(500).send('Error in saving user');
        }
    },

    // User login
    async login(req, res) {
        try {
            const { email, password } = req.body;
            const user = await User.findOne({ email });

            if (!user || !await bcrypt.compare(password, user.password)) {
                return res.status(400).send('Invalid credentials');
            }

            const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET);
            res.send({ token });
        } catch (error) {
            res.status(500).send('Error in user login');
        }
    },

    // Additional methods to be added
};

module.exports = userController;

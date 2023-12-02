const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const userController = {
  // Register a new user
  async register(req, res) {
    try {
      const { username, email, password } = req.body;

      // Validate input (you can expand this with more sophisticated validation)
      if (!username || !email || !password) {
        return res.status(400).send("All fields are required");
      }

      // Check if user already exists
      let user = await User.findOne({ email });
      if (user) {
        return res.status(400).send("User already exists.");
      }

      // Create a new user
      user = new User({
        username,
        email,
        password: await bcrypt.hash(password, 10),
      });
      await user.save();

      // Generate a token
      const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
        expiresIn: "1d",
      });

      // Return the token and user details (excluding password)
      res.status(201).send({ user: { username, email }, token });
    } catch (error) {
      res.status(500).send("Error in saving user: " + error.message);
    }
  },

  // User login
  async login(req, res) {
    try {
      const { email, password } = req.body;

      // Input validation
      if (!email || !password) {
        return res.status(400).send("Email and password are required");
      }

      // Check if user exists
      const user = await User.findOne({ email });
      if (!user || !(await bcrypt.compare(password, user.password))) {
        return res.status(401).send("Invalid credentials");
      }

      // Generate a token
      const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
        expiresIn: "1d",
      });
      res.send({ token });
    } catch (error) {
      res.status(500).send("Error in user login: " + error.message);
    }
  },

  // Additional methods tbd
};

module.exports = userController;

const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const validatePassword = require("../utils/validatePassword");

const userController = {
  // Register a new user
  async register(req, res) {
    try {
      const { username, email, password } = req.body;

      // Validate input
      if (!username || !email || !password) {
        return res.status(400).send("All fields are required");
      }

      // Password complexity validation
      if (!validatePassword(password)) {
        return res
          .status(400)
          .send(
            "Password must be at least 8 characters long, include a special character, and a capital letter"
          );
      }

      // Check if user already exists
      let user = await User.findOne({ email });
      if (user) {
        return res.status(400).send("User already exists.");
      }

      // Create a new user with hashed password
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
      const { email, password, username } = req.body;

      if (!password || (!email && !username)) {
        return res.status(400).send("Email/Username and password are required");
      }

      let user;
      if (email) {
        user = await User.findOne({ email });
      } else if (username) {
        user = await User.findOne({ username });
      }

      // Debugging log
      console.log("User found: ", user);
      console.log("Stored hash: ", user.password);
      console.log("Password being verified: ", password);

      if (!user) {
        return res.status(401).send("User not found");
      }

      const isMatch = await bcrypt.compare(password, user.password);
      // Debugging log
      console.log("Password match: ", isMatch);

      if (!isMatch) {
        return res.status(401).send("Invalid credentials");
      }

      const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
        expiresIn: "1d",
      });
      res.send({ token });
    } catch (error) {
      console.error("Login error: ", error);
      res.status(500).send("Error in user login: " + error.message);
    }
  },

  // Additional methods tbd
};

module.exports = userController;

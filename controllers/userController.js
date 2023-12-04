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
        password,
        userImage: `https://joesch.moe/api/v1/${username}`,
      });

      // console.log("New user created: ", user);

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
      // console.log("Login attempt: ", { email, username }); // Log email and username

      if (!password || (!email && !username)) {
        // console.log("Login failed: Missing email/username or password");
        return res.status(400).send("Email/Username and password are required");
      }

      let user;
      if (email) {
        // console.log("Attempting to find user by email");
        user = await User.findOne({ email });
      } else if (username) {
        // console.log("Attempting to find user by username");
        user = await User.findOne({ username });
      }

      if (!user) {
        // console.log("Login failed: User not found", { email, username });
        return res.status(401).send("User not found");
      }

      // console.log("User found: ", { id: user._id, email: user.email, username: user.username });
      // console.log("Stored hash: ", user.password);
      // console.log("Password being verified: ", password);

      const isMatch = await bcrypt.compare(password, user.password);
      // console.log("Password match: ", isMatch);

      if (!isMatch) {
        // console.log("Login failed: Password mismatch");
        return res.status(401).send("Invalid credentials");
      }

      const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
        expiresIn: "1d",
      });
      // console.log("Login successful: Token generated");
      res.send({ token });
    } catch (error) {
      console.error("Login error: ", error);
      res.status(500).send("Error in user login: " + error.message);
    }
  },


  // Additional methods tbd
};

module.exports = userController;

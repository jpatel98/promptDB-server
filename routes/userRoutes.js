const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const authMiddleware = require("../middleware/authMiddleware"); 

// User registration
router.post("/register", userController.register);

// User login
router.post("/login", userController.login);

// Protected route for user profile
router.get("/profile", authMiddleware, userController.getProfile);

// Additional methods tbd

module.exports = router;

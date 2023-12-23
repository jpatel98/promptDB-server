const express = require("express");
const router = express.Router();
const promptController = require("../controllers/promptController");
const authMiddleware = require("../middleware/authMiddleware");

// Add a new prompt
router.post("/add", authMiddleware, promptController.addPrompt);

// Get all prompts
router.get("/all", promptController.getAllPrompts);

// Get a prompt by its ID
router.get('/getById/:promptId', authMiddleware, promptController.getPromptById);

// Edit a prompt
router.put("/edit/:promptId", authMiddleware, promptController.editPrompt); // Using URL parameter for promptId

// Delete a prompt
router.delete("/delete/:promptId", authMiddleware, promptController.deletePrompt); // Using URL parameter for promptId

// Like a prompt
router.put("/like/:promptId", authMiddleware, promptController.likePrompt); // Using URL parameter for promptId

// Remove like from a prompt
router.put('/removeLike/:promptId', authMiddleware, promptController.removeLike);

// Get featured prompts
router.get('/api/prompts/featured', promptController.getFeaturedPrompts);

module.exports = router;

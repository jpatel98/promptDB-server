const express = require("express");
const router = express.Router();
const promptController = require("../controllers/promptController");

// Add a new prompt
router.post("/add", promptController.addPrompt);

// Get all prompts
router.get("/all", promptController.getAllPrompts);

// Edit a prompt
router.put("/edit/:promptId", promptController.editPrompt); // Using URL parameter for promptId

// Delete a prompt
router.delete("/delete/:promptId", promptController.deletePrompt); // Using URL parameter for promptId

// Like a prompt
router.put("/like/:promptId", promptController.likePrompt); // Using URL parameter for promptId

module.exports = router;

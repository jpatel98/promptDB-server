const Prompt = require("../models/prompt");

const promptController = {
  // Add a new prompt
  async addPrompt(req, res) {
    try {
      const { title, description, tags } = req.body;

      // Input validation
      if (!title || !description) {
        return res.status(400).send("Title and description are required");
      }

      // Create and save the prompt
      let prompt = new Prompt({
        title,
        description,
        tags,
        createdBy: req.user._id,
      });
      await prompt.save();
      res.status(201).send(prompt);
    } catch (error) {
      res.status(500).send("Error in adding prompt: " + error.message);
    }
  },

  // Get all prompts
  async getAllPrompts(req, res) {
    try {
      const prompts = await Prompt.find().populate("createdBy", "username");
      res.send(prompts);
    } catch (error) {
      res.status(500).send("Error in fetching prompts: " + error.message);
    }
  },

  // Edit a prompt
  async editPrompt(req, res) {
    try {
      const { promptId, title, description, tags } = req.body;
      const prompt = await Prompt.findByIdAndUpdate(
        promptId,
        { title, description, tags },
        { new: true }
      );
      if (!prompt) {
        return res.status(404).send("Prompt not found");
      }
      res.send(prompt);
    } catch (error) {
      res.status(500).send("Error in editing prompt: " + error.message);
    }
  },

  // Delete a prompt
  async deletePrompt(req, res) {
    try {
      const { promptId } = req.body;
      const prompt = await Prompt.findByIdAndDelete(promptId);
      if (!prompt) {
        return res.status(404).send("Prompt not found");
      }
      res.send("Prompt deleted successfully");
    } catch (error) {
      res.status(500).send("Error in deleting prompt: " + error.message);
    }
  },

  // Like a prompt
  async likePrompt(req, res) {
    try {
      const { promptId } = req.params; // Assuming promptId is passed as a URL parameter

      // Find the prompt and increment likes
      const prompt = await Prompt.findById(promptId);
      if (!prompt) {
        return res.status(404).send("Prompt not found");
      }

      prompt.likes += 1; // Incrementing the likes
      await prompt.save();

      res.send({ likes: prompt.likes });
    } catch (error) {
      res.status(500).send("Error in liking prompt: " + error.message);
    }
  },

  // Additional methods for further functionalities can be added here
};

module.exports = promptController;

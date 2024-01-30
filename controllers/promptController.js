const Prompt = require("../models/prompt");
const authMiddleware = require("../middleware/authMiddleware");

const promptController = {
  // Add a new prompt
  async addPrompt(req, res) {
    try {
      const { title, description, tags } = req.body;
      if (!title || !description) {
        return res.status(400).send("Title and description are required");
      }
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
      authMiddleware(req, res, async () => {
        const prompts = await Prompt.find().populate('createdBy', 'username');
        res.send(prompts);
      });
    } catch (error) {
      res.status(500).send("Error in fetching prompts: " + error.message);
    }
  },

  // Get a prompt by userID
  async getPromptsByUserId(req, res) {
    try {
      const { userId } = req.params;
      const prompts = await Prompt.find({ createdBy: userId }).populate("createdBy", "username");
      res.send(prompts);
    } catch (error) {
      res.status(500).send("Error in fetching prompts: " + error.message);
    }
  },

  // Edit a prompt
  async editPrompt(req, res) {
    try {
      const { promptId } = req.params; // Get promptId from URL params
      const { title, description, tags } = req.body; // Keep these as they are
      const prompt = await Prompt.findOne({
        _id: promptId,
        createdBy: req.user._id,
      });
      if (!prompt) {
        return res.status(404).send("Prompt not found or access denied");
      }
      prompt.title = title;
      prompt.description = description;
      prompt.tags = tags;
      await prompt.save();
      res.send(prompt);
    } catch (error) {
      res.status(500).send("Error in editing prompt: " + error.message);
    }
  },

  // Delete a prompt
  async deletePrompt(req, res) {
    try {
      const { promptId } = req.params;
      const prompt = await Prompt.findOneAndDelete({
        _id: promptId,
        createdBy: req.user._id,
      });
      if (!prompt) {
        return res.status(404).send("Prompt not found or access denied");
      }
      res.send("Prompt deleted successfully");
    } catch (error) {
      res.status(500).send("Error in deleting prompt: " + error.message);
    }
  },

  // Like a prompt
  async likePrompt(req, res) {
    try {
      const { promptId } = req.params;
      const prompt = await Prompt.findById(promptId);
      if (!prompt) {
        return res.status(404).send("Prompt not found");
      }
      prompt.likes += 1;
      await prompt.save();
      res.send({ likes: prompt.likes });
    } catch (error) {
      res.status(500).send("Error in liking prompt: " + error.message);
    }
  },

  // Unlike a prompt
  async removeLike(req, res) {
    try {
      const { promptId } = req.params;
      const prompt = await Prompt.findById(promptId);
      if (!prompt) {
        return res.status(404).send("Prompt not found");
      }
      if (prompt.likes > 0) {
        prompt.likes -= 1;
      }
      await prompt.save();
      res.send({ likes: prompt.likes });
    } catch (error) {
      res
        .status(500)
        .send("Error in removing like from prompt: " + error.message);
    }
  },

  // Get featured prompts
  async getFeaturedPrompts(req, res) {
    try {
      const featuredPrompts = await Prompt.find({ featured: true }).populate(
        "createdBy",
        "username"
      );
      res.send(featuredPrompts);
    } catch (error) {
      res
        .status(500)
        .send("Error in fetching featured prompts: " + error.message);
    }
  },
  // Additional methods will go here
};

module.exports = promptController;

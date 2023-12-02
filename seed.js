// seed.js

require("dotenv").config();
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const User = require("./models/User");
const Prompt = require("./models/Prompt");
const { users, prompts } = require("./seedData");

async function seedDB() {
  try {
    // Database Connection
    await mongoose.connect(process.env.MONGO_DB_CONNECTION_STRING);
    console.log("Connected to MongoDB");

    // Clear existing data
    await User.deleteMany({});
    await Prompt.deleteMany({});

    // Seed Users and get their IDs
    const userIDs = {};
    for (const user of users) {
      const hashedPassword = await bcrypt.hash(user.password, 10);
      const newUser = await new User({
        ...user,
        password: hashedPassword,
      }).save();
      userIDs[user.username] = newUser._id;
    }

    // Replace createdBy in prompts with actual user IDs
    const promptsToSeed = prompts.map((prompt) => ({
      ...prompt,
      createdBy: userIDs[prompt.createdBy],
    }));

    // Seed Prompts
    for (const prompt of promptsToSeed) {
      await new Prompt(prompt).save();
    }

    console.log("Database seeded!");
    mongoose.connection.close();
  } catch (error) {
    console.error("Error seeding database:", error);
    mongoose.connection.close();
  }
}

seedDB();

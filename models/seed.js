require("dotenv").config();
const MongoClient = require('mongodb').MongoClient;
const fs = require('fs');

// MongoDB connection URL and database name
const url = process.env.MONGO_DB_CONNECTION_STRING;
const dbName = process.env.MONGO_DB_NAME;

// Read the prompts data from the JSON file
const promptsData = JSON.parse(fs.readFileSync(`${__dirname}/promptsDB.json`, 'utf8'));

// Function to seed data into MongoDB
async function seedData() {
  let client;

  try {
    // Connect to the MongoDB client
    client = await MongoClient.connect(url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log('Connected successfully to server');

    const db = client.db(dbName);

    // Name of the collection
    const collection = db.collection('prompts');

    // Insert the data into the collection
    const insertResult = await collection.insertMany(promptsData);
    console.log('Inserted documents:', insertResult.insertedCount);
  } catch (err) {
    console.error('An error occurred:', err);
  } finally {
    // Close the connection
    if (client) {
      await client.close();
    }
  }
}

seedData();

const { MongoClient } = require("mongodb");

const connectDb = async (client) => {
  try {
    await client.connect();
  } catch (err) {
    console.error("Error connecting to db");
  }
};

const client = new MongoClient(process.env.MONGO_URI);
connectDb(client).catch(console);

module.exports = client;

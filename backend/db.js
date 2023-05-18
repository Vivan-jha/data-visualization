const { MongoClient } = require('mongodb');

const url = 'mongodb://0.0.0.0:27017'; // replace with your MongoDB connection URL
const dbName = 'demo'; // replace with your database name

let db;

async function connectToMongoDB() {
  try {
    const client = await MongoClient.connect(url);
    db = client.db(dbName);
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('Failed to connect to MongoDB', error);
  }
}

async function fetchCollectionData(collectionName, filter = {}) {
  try {
    const collection = db.collection(collectionName);
    const data = await collection.find(filter).toArray();
    return data;
  } catch (error) {
    console.error('Error fetching data from collection', error);
    throw error;
  }
}

module.exports = {
  connectToMongoDB,
  fetchCollectionData,
};

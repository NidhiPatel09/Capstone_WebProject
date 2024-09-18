import { MongoClient, Db } from 'mongodb';

let db: Db;
let client: MongoClient; // Keep a reference to the MongoClient

export const connectDB = async (): Promise<Db> => {
  client = new MongoClient(process.env.MONGODB_URI as string,);

  await client.connect();
  db = client.db('Recipe');
  console.log('Connected to MongoDB');
  return db;
};

export const getDB = (): Db => {
  if (!db) {
    throw new Error('Database not initialized. Call connectDB first.');
  }
  return db;
};

export const closeDB = async (): Promise<void> => {
  if (client) { // Close the MongoClient instance, not Db
    await client.close();
    console.log('MongoDB connection closed');
  }
};

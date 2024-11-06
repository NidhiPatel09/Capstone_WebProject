import { MongoClient, Db } from 'mongodb';

let db: Db;
let client: MongoClient; 
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
  if (client) { 
    await client.close();
    console.log('MongoDB connection closed');
  }
};

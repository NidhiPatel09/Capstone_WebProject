<<<<<<< HEAD
import { MongoClient, Db } from 'mongodb';

let db: Db;
let client: MongoClient; 
export const connectDB = async (): Promise<Db> => {
  client = new MongoClient(process.env.MONGODB_URI as string,);

  await client.connect();
  db = client.db('Recipe');
  console.log('Connected to MongoDB');
=======
import { MongoClient, Db } from "mongodb";

let db: Db;
let client: MongoClient;
export const connectDB = async (): Promise<Db> => {
  client = new MongoClient(process.env.MONGODB_URI as string);

  await client.connect();
  db = client.db("Recipe");
  console.log("Connected to MongoDB");
>>>>>>> main
  return db;
};

export const getDB = (): Db => {
  if (!db) {
<<<<<<< HEAD
    throw new Error('Database not initialized. Call connectDB first.');
=======
    throw new Error("Database not initialized. Call connectDB first.");
>>>>>>> main
  }
  return db;
};

export const closeDB = async (): Promise<void> => {
<<<<<<< HEAD
  if (client) { 
    await client.close();
    console.log('MongoDB connection closed');
=======
  if (client) {
    await client.close();
    console.log("MongoDB connection closed");
>>>>>>> main
  }
};

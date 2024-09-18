import { MongoClient, Db } from "mongodb";
import dotenv from "dotenv";

dotenv.config();

let db: Db;

const mongoURI = process.env.MONGODB_URI as string;

export const connectDB = async (): Promise<Db> => {
  try {
    const client = await MongoClient.connect(mongoURI);
    db = client.db("Recipe");
    console.log("Connected to MongoDB, Database:", db.databaseName);
    return db;
  } catch (err) {
    console.error("Failed to connect to MongoDB", err);
    throw err;
  }
};

export const getDB = (): Db => {
  if (!db) {
    throw new Error("Database not initialized. Call connectDB first.");
  }
  return db;
};

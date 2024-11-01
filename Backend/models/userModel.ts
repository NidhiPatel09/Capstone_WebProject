import { getDB } from "../config/db";
import { ObjectId } from "mongodb";

// Updated User interface
export interface User {
  _id?: string | ObjectId;
  email: string;
  favoriteRecipes: ObjectId[]; // Store ObjectId[] for favoriteRecipes
}

// Get the users collection from the DB
const usersCollection = () => getDB().collection<User>("users");

// Create a new user
export const createUser = async (email: string): Promise<User> => {
  const newUser: Omit<User, '_id'> = { email, favoriteRecipes: [] };
  const result = await usersCollection().insertOne(newUser);

  // Return the user object, converting _id to string
  return { ...newUser, _id: result.insertedId.toString() };
};

// Find a user by email
export const findUserByEmail = async (email: string): Promise<User | null> => {
  const user = await usersCollection().findOne({ email });
  if (user) {
    return { ...user, _id: user._id?.toString() }; // Convert _id to string
  }
  return null;
};


// Function to add a recipe to favorites
export const addRecipeToFavorites = async (userId: string, recipeId: string): Promise<void> => {
  await getDB().collection<User>("users").updateOne(
    { _id: new ObjectId(userId) }, // Convert userId string back to ObjectId
    { $addToSet: { favoriteRecipes: new ObjectId(recipeId) } } // Use ObjectId for recipeId
  );
};

// Function to remove a recipe from favorites
export const removeRecipeFromFavorites = async (userId: string, recipeId: string): Promise<void> => {
  await getDB().collection<User>("users").updateOne(
    { _id: new ObjectId(userId) }, // Convert userId string back to ObjectId
    { $pull: { favoriteRecipes: new ObjectId(recipeId) } } // Use ObjectId for recipeId
  );
};

// Function to get a user's favorite recipes (convert ObjectId to string for return)
export const getFavoriteRecipes = async (userId: string): Promise<string[]> => {
  const user = await getDB().collection<User>("users").findOne({ _id: new ObjectId(userId) });

  // Convert ObjectIds to strings before returning
  return user?.favoriteRecipes.map(recipeId => recipeId.toString()) || [];
};

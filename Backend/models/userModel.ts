import { getDB } from "../config/db";
import { ObjectId } from "mongodb";
import bcrypt from "bcrypt";

// Updated User interface with optional fields
export interface User {
  _id?: string | ObjectId;
  email?: string; 
  favoriteRecipes: ObjectId[]; 
  facebookId?: string; 
  displayName?: string; 
  profilePicture?: string; 
  password?: string;
}

// Get the users collection from the DB
export const usersCollection = () => getDB().collection<User>("users");

// Create a new user with email and password
export const createUser = async (email: string, password: string): Promise<User> => {
  const newUser: Omit<User, "_id"> = { email, password, favoriteRecipes: [] };
  const result = await usersCollection().insertOne(newUser);

  // Fetch the inserted user to get the correct '_id'
  const user = await usersCollection().findOne({ _id: result.insertedId });

  if (user) {
    return { ...user, _id: user._id.toString() };
  } else {
    throw new Error("Failed to retrieve newly created user");
  }
};

// Find a user by email
export const findUserByEmail = async (email: string): Promise<User | null> => {
  const user = await usersCollection().findOne({ email });
  if (user) {
    return { ...user, _id: user._id?.toString() };
  }
  return null;
};

// Find a user by ID
export const findUserById = async (id: string): Promise<User | null> => {
  const user = await usersCollection().findOne({ _id: new ObjectId(id) });
  if (user) {
    return { ...user, _id: user._id?.toString() }; 
  }
  return null;
};

// Create a new user using the Facebook ID (for users without an email)
export const createUserWithFacebookId = async (
  facebookId: string,
  displayName: string,
  profilePicture: string
): Promise<User> => {
  const newUser: Omit<User, "_id"> = {
    facebookId,
    favoriteRecipes: [],
    displayName,
    profilePicture,
  };
  const result = await usersCollection().insertOne(newUser);

  // Fetch the inserted user to get the correct '_id'
  const user = await usersCollection().findOne({ _id: result.insertedId });

  if (user) {
    return { ...user, _id: user._id.toString() };
  } else {
    throw new Error("Failed to retrieve newly created user");
  }
};

// Find a user by Facebook ID
export const findUserByFacebookId = async (
  facebookId: string
): Promise<User | null> => {
  const user = await usersCollection().findOne({ facebookId });
  if (user) {
    return { ...user, _id: user._id?.toString() };
  }
  return null;
};

// Update user profile with latest displayName and profilePicture
export const updateUserProfile = async (
  userId: string,
  displayName: string,
  profilePicture: string
): Promise<void> => {
  await usersCollection().updateOne(
    { _id: new ObjectId(userId) },
    { $set: { displayName, profilePicture } }
  );
};

// Function to add a recipe to favorites
export const addRecipeToFavorites = async (
  userId: string,
  recipeId: string
): Promise<void> => {
  await usersCollection().updateOne(
    { _id: new ObjectId(userId) },
    { $addToSet: { favoriteRecipes: new ObjectId(recipeId) } }
  );
};

// Function to remove a recipe from favorites
export const removeRecipeFromFavorites = async (
  userId: string,
  recipeId: string
): Promise<void> => {
  await usersCollection().updateOne(
    { _id: new ObjectId(userId) },
    { $pull: { favoriteRecipes: new ObjectId(recipeId) } }
  );
};

// Function to get a user's favorite recipes (convert ObjectId to string for return)
export const getFavoriteRecipes = async (
  userId: string
): Promise<string[]> => {
  const user = await usersCollection().findOne({ _id: new ObjectId(userId) });

  // Convert ObjectIds to strings before returning
  return user?.favoriteRecipes.map((recipeId) => recipeId.toString()) || [];
};

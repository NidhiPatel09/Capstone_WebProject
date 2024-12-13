import { ObjectId } from "mongodb";

export interface User {
  _id?: string | ObjectId;
  email?: string;
  favoriteRecipes: ObjectId[];
  facebookId?: string;
  displayName?: string;
  profilePicture?: string;
  password?: string;
  role?: string;
}
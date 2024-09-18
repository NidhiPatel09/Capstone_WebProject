import { ObjectId } from "mongodb";

export interface Recipe {
  _id: ObjectId;
  title: string;
  description: string;
  ingredients: string[];
  instructions: string[];
}


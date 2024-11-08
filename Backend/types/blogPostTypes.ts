import { ObjectId } from "mongodb";

export interface BlogPost {
  _id?: ObjectId;
  title: string;
  description: string;
  ingredients: string;
  steps: string;
  servings: number;
  authorId: string;
  categories?: number[];
  publish: boolean;
  createdAt: Date;
  updatedAt: Date;
}

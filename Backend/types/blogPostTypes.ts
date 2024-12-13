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

export interface BlogPostInput {
  _id?: ObjectId;
  authorId: String;
  categoryId?: ObjectId;
  title: string;
  description: string;
  image?: string;
  publishedAt?: Date;
  updatedAt?: Date;
  readingTime?: string;
}
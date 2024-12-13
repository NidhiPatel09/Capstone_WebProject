export default interface Recipe {
  _id: string;
  title: string;
  description?: string;
  ingredients: string[];
  instructions: string[];
  link?: string;
  source?: string;
  NER?: string[];
  createdAt?: string;
  isVerified?: boolean;
}

// for adding the recipes
export type RecipeForCreation = Omit<Recipe, "_id">;

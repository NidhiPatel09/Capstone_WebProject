"use client";
import { Suspense, useState } from "react";
import Recipes from "@/Components/recipes/Recipes";
import RecipeDetails from "@/Components/recipes/RecipeDetails";

export default function RecipesPage() {
  const [selectedRecipeId, setSelectedRecipeId] = useState<string | null>(null);

  // when the id is provided, updating the state
  const handleViewRecipe = (id: string) => {
    setSelectedRecipeId(id);
  };

  return (
    <>
      <header
        className="relative w-full h-screen bg-cover bg-center"
        style={{
          backgroundImage: `url(https://res.cloudinary.com/dyof62lts/image/upload/v1728660974/recipe-page_abq5l4.jpg)`,
        }}
      >
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <div className="relative z-10 flex flex-col items-start justify-center h-full pl-12 md:pl-24 text-left">
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-4">
            Master Your Kitchen
          </h1>
          <p className="text-xl md:text-2xl text-white mb-8">
            Discover step-by-step guides for culinary success.
          </p>
          <button className="bg-green-600 text-white px-6 py-2 rounded-md hover:bg-green-500 transition duration-300">
            START COOKING
          </button>
        </div>
      </header>
      <Recipes onViewRecipe={handleViewRecipe} recipeId={selectedRecipeId ? selectedRecipeId : ''} />
      {/* when the id is not null, recipe details will be shown here */}
      {selectedRecipeId && <RecipeDetails recipeId={selectedRecipeId} />}
    </>
  );
}

"use client";

import createRecipe from "@/actions/createRecipe";
import React, { useState } from "react";

const RecipeRequestForm = () => {
  const [recipeData, setRecipeData] = useState({
    title: "",
    description: "",
    ingredients: "",
    instructions: "",
    link: "",
    source: "",
  });
  const [formError, setFormError] = useState<string | null>(null);
  const [formSuccess, setFormSuccess] = useState<string | null>(null);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setRecipeData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError(null);
    setFormSuccess(null);

    try {
      // Prepare the recipe data
      const recipe = {
        ...recipeData,
        ingredients: recipeData.ingredients.split(",").map((i) => i.trim()),
        instructions: recipeData.instructions.split(",").map((i) => i.trim()),
      };

      // Call the server action to add the recipe
      await createRecipe(recipe);
      setFormSuccess("Recipe request submitted successfully!");
      setRecipeData({
        title: "",
        description: "",
        ingredients: "",
        instructions: "",
        link: "",
        source: "",
      });
    } catch (error: any) {
      setFormError(error.message || "Failed to submit recipe request.");
    }
  };

  return (
    <div className="bg-gray-100 p-6 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-4">Request to Add Your Recipe</h2>
      {formError && <p className="text-red-500">{formError}</p>}
      {formSuccess && <p className="text-green-500">{formSuccess}</p>}
      <form onSubmit={handleFormSubmit}>
        <div className="mb-4">
          <label htmlFor="title" className="block font-bold mb-1">
            Title:
          </label>
          <input
            type="text"
            id="title"
            name="title"
            value={recipeData.title}
            onChange={handleInputChange}
            required
            className="w-full border border-gray-300 p-2 rounded"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="description" className="block font-bold mb-1">
            Description:
          </label>
          <textarea
            id="description"
            name="description"
            value={recipeData.description}
            onChange={handleInputChange}
            className="w-full border border-gray-300 p-2 rounded"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="ingredients" className="block font-bold mb-1">
            Ingredients (comma-separated):
          </label>
          <textarea
            id="ingredients"
            name="ingredients"
            value={recipeData.ingredients}
            onChange={handleInputChange}
            className="w-full border border-gray-300 p-2 rounded"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="instructions" className="block font-bold mb-1">
            Instructions (comma-separated):
          </label>
          <textarea
            id="instructions"
            name="instructions"
            value={recipeData.instructions}
            onChange={handleInputChange}
            className="w-full border border-gray-300 p-2 rounded"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="link" className="block font-bold mb-1">
            Link:
          </label>
          <input
            type="url"
            id="link"
            name="link"
            value={recipeData.link}
            onChange={handleInputChange}
            className="w-full border border-gray-300 p-2 rounded"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="source" className="block font-bold mb-1">
            Source:
          </label>
          <input
            type="text"
            id="source"
            name="source"
            value={recipeData.source}
            onChange={handleInputChange}
            className="w-full border border-gray-300 p-2 rounded"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-600"
        >
          Submit Recipe
        </button>
      </form>
    </div>
  );
};

export default RecipeRequestForm;

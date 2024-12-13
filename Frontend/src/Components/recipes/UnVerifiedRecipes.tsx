"use client";
import React, { useEffect, useState } from "react";
import { fetchUnVerifiedRecipes } from "@/actions/fetchRecipes";
import { Button, Modal, Box, Typography, CircularProgress } from "@mui/material";

const UnverifiedRecipes = () => {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedRecipe, setSelectedRecipe] = useState<any | null>(null);
  const [open, setOpen] = useState(false);

  const handleOpen = (recipe: any) => {
    setSelectedRecipe(recipe);
    setOpen(true);
  };
  const handleClose = () => {
    setSelectedRecipe(null);
    setOpen(false);
  };

  useEffect(() => {
    const loadRecipes = async () => {
      try {
        const data = await fetchUnVerifiedRecipes();
        setRecipes(data);
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setLoading(false);
      }
    };

    loadRecipes();
  }, [recipes]);

  if (loading)
    return (
      <div className="flex justify-center py-10">
        <CircularProgress />
      </div>
    );
  if (error)
    return <p className="text-red-500 text-center py-4">Error: {error}</p>;

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Pending Recipes</h2>
      {recipes.length === 0 ? (
        <p className="text-gray-500">No pending recipes found.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {recipes.map((recipe: any) => (
            <div
              key={recipe._id}
              className="p-4 border rounded-lg shadow-md bg-white"
            >
              <h3 className="text-lg font-semibold">{recipe.title}</h3>
              {recipe.description && (
                <p className="text-gray-600 mt-2">
                  {recipe.description.substring(0, 100)}...
                </p>
              )}
              <Button
                variant="contained"
                className="mt-4"
                onClick={() => handleOpen(recipe)}
              >
                View Details
              </Button>
            </div>
          ))}
        </div>
      )}

      {/* Modal for Recipe Details */}
      <Modal open={open} onClose={handleClose}>
        <Box
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 p-6 bg-white shadow-lg rounded-lg w-11/12 md:w-1/2"
        >
          {selectedRecipe && (
            <>
              <Typography variant="h6" className="font-bold">
                {selectedRecipe.title}
              </Typography>
              {selectedRecipe.description && (
                <Typography variant="body1" className="mt-2 text-gray-700">
                  {selectedRecipe.description}
                </Typography>
              )}
              {selectedRecipe.ingredients && (
                <Typography variant="body1" className="mt-4">
                  <strong>Ingredients:</strong>
                  <ul className="list-disc ml-6">
                    {selectedRecipe.ingredients.map((ingredient: string, index: number) => (
                      <li key={index}>{ingredient}</li>
                    ))}
                  </ul>
                </Typography>
              )}
              {selectedRecipe.instructions && (
                <Typography variant="body1" className="mt-4">
                  <strong>Instructions:</strong>
                  <ol className="list-decimal ml-6">
                    {selectedRecipe.instructions.map((instruction: string, index: number) => (
                      <li key={index}>{instruction}</li>
                    ))}
                  </ol>
                </Typography>
              )}
              {selectedRecipe.link && (
                <Typography variant="body2" className="mt-4 text-blue-600">
                  <a href={selectedRecipe.link} target="_blank" rel="noopener noreferrer">
                    Recipe Link
                  </a>
                </Typography>
              )}
              {selectedRecipe.source && (
                <Typography variant="body2" className="mt-2 text-gray-600">
                  <strong>Source:</strong> {selectedRecipe.source}
                </Typography>
              )}
              {selectedRecipe.createdAt && (
                <Typography variant="body2" className="mt-2 text-gray-600">
                  <strong>Created At:</strong> {new Date(selectedRecipe.createdAt).toLocaleDateString()}
                </Typography>
              )}
              <Typography variant="body2" className="mt-2 text-green-600">
                <strong>Status:</strong> {selectedRecipe.isVerified ? "Verified" : "Pending"}
              </Typography>
              <Button
                variant="outlined"
                className="mt-4"
                onClick={handleClose}
              >
                Close
              </Button>
            </>
          )}
        </Box>
      </Modal>
    </div>
  );
};

export default UnverifiedRecipes;
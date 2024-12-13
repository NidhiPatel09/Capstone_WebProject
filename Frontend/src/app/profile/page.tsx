"use client";

import fetchImagesForRecipeDetails from "@/actions/fetchImagesForRecipeDetails";
import fetchRecipeById from "@/actions/fetchRecipeById";
import userSession from "@/actions/userSession";
import { SkeletonLoader } from "@/Components/Loaders/SkeletonLoader";
import RecipeRequestForm from "@/Components/recipes/RecipeRequest";
import User from "@/types/User";
import { useEffect, useState } from "react";
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  Box,
  Button,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import deleteFavoriteRecipe from "@/actions/deleteFavoriteRecipe";
import UnverifiedRecipes from "@/Components/recipes/UnVerifiedRecipes";
import VerifiedRecipes from "@/Components/recipes/VerifiedRecipes";

export default function Profile() {
  const [user, setUser] = useState<User | null>(null);
  const [favoriteRecipes, setFavoriteRecipes] = useState<any[]>([]); // Store fetched recipes
  const [imageUrls, setImageUrls] = useState<{ [key: string]: string }>({});
  const [loading, setLoading] = useState<boolean>(true);
  const [isFavorite, setIsFavorite] = useState<boolean | null>();

  useEffect(() => {
    async function fetchUserAndFavorites() {
      try {
        // Fetch the user session
        const fetchedUser = await userSession();
        setUser(fetchedUser || null);

        // Fetch recipes by IDs if favoriteRecipes exist
        if (fetchedUser && fetchedUser.favoriteRecipes) {
          const recipes = await Promise.all(
            fetchedUser.favoriteRecipes.map((recipeId: string) =>
              fetchRecipeById(recipeId)
            )
          );

          setFavoriteRecipes(recipes);

          // Fetch images for the recipes
          const images = await Promise.all(
            recipes.map(async (recipe) => {
              const image = await fetchImagesForRecipeDetails(recipe);
              return { [recipe._id]: Object.values(image)[0] }; // Extract image URL
            })
          );

          const imagesObject = images.reduce(
            (acc, cur) => ({ ...acc, ...cur }),
            {}
          );
          setImageUrls(imagesObject);
        }
      } catch (error) {
        console.error("Error fetching user or recipes:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchUserAndFavorites();
  }, [isFavorite]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-100">
        <SkeletonLoader width={300} height={300} />
      </div>
    );
  }

  return (
    <Box className="flex justify-center items-center min-h-screen bg-gray-100">
      <Box
        sx={{
          bgcolor: "white",
          p: 4,
          borderRadius: 2,
          boxShadow: 3,
          width: "100%",
          maxWidth: "800px",
        }}
      >
        <Typography variant="h4" textAlign="center" gutterBottom>
          Your Profile
        </Typography>
        <Typography
          variant="body1"
          textAlign="center"
          color="textSecondary"
          gutterBottom
        >
          Here are your profile details and favorite recipes.
        </Typography>

        {/* Display User Details */}
        {user && Object.keys(user).length > 0 && (
          <Box display="flex" alignItems="center" mb={3}>
            <img
              src={
                user.facebookId &&
                "https://upload.wikimedia.org/wikipedia/commons/5/51/Facebook_f_logo_%282019%29.svg"
              }
              alt="User Avatar"
              style={{
                width: 80,
                height: 80,
                borderRadius: "50%",
                objectFit: "cover",
                boxShadow: "0 0 6px rgba(0, 0, 0, 0.2)",
              }}
            />
            <Box ml={2}>
              <Typography variant="h6">
                {user.displayName || user.email}
              </Typography>
              <Typography variant="body2" color="textSecondary">
                {user.email}
              </Typography>
            </Box>
          </Box>
        )}

        {/* Favorite Recipes Section */}
        <Box>
          <Typography variant="h5" gutterBottom>
            Favorite Recipes
          </Typography>
          {favoriteRecipes.length > 0 ? (
            <Box display="grid" gridTemplateColumns="1fr 1fr" gap={2}>
              {favoriteRecipes.map((recipe) => (
                <Box
                  key={recipe._id}
                  sx={{
                    bgcolor: "grey.100",
                    p: 2,
                    borderRadius: 1,
                    boxShadow: 2,
                  }}
                >
                  <img
                    src={
                      imageUrls[recipe._id] || "https://via.placeholder.com/150"
                    }
                    alt={recipe.title}
                    style={{
                      width: "100%",
                      height: "150px",
                      objectFit: "cover",
                      borderRadius: "4px",
                    }}
                  />
                  <Typography variant="subtitle1" mt={1}>
                    {recipe.title}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    {recipe.description || "No description available."}
                  </Typography>
                  <Button
                    href={recipe.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    variant="text"
                    size="small"
                    sx={{ mt: 1 }}
                  >
                    View Recipe
                  </Button>
                  <Button
                    onClick={(e) => {
                      e.preventDefault();
                      deleteFavoriteRecipe(recipe._id);
                      setIsFavorite(false);
                    }}
                    variant="text"
                    size="small"
                    color="error"
                    sx={{ mt: 1 }}
                  >
                    Delete Recipe
                  </Button>
                </Box>
              ))}
            </Box>
          ) : (
            <Typography variant="body2" color="textSecondary">
              No favorite recipes found.
            </Typography>
          )}
        </Box>

        {/* Recipe Request Form Section */}
        <Accordion sx={{ mt: 4 }}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="recipe-request-form"
            id="recipe-request-form-header"
          >
            <Typography variant="h6">Request to Add a Recipe</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <RecipeRequestForm />
          </AccordionDetails>
        </Accordion>
        <UnverifiedRecipes />
        <VerifiedRecipes />
        {/* Buttons for Update and Delete */}
        <Box mt={4}>
          <Button
            fullWidth
            variant="contained"
            color="primary"
            sx={{ mb: 2 }}
            onClick={() => alert("Update profile functionality goes here")}
          >
            Update Profile
          </Button>
          <Button
            fullWidth
            variant="contained"
            color="error"
            onClick={() => alert("Delete account functionality goes here")}
          >
            Delete Account
          </Button>
        </Box>
      </Box>
    </Box>
  );
}

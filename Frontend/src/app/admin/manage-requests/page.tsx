"use client";
import React, { useEffect, useState } from "react";
import {
  Container,
  Typography,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  CircularProgress,
  Snackbar,
  Alert,
} from "@mui/material";
import Recipe from "@/types/Recipe";
import { fetchUnVerifiedRecipes } from "@/actions/fetchRecipes";
import approveRecipe from "@/actions/admin/approveRecipe";
import deleteRecipe from "@/actions/deleteRecipe";

export default function ManageRequests() {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [loading, setLoading] = useState(false);
  const [snackbar, setSnackbar] = useState<{ open: boolean; message: string; severity: "success" | "error" }>({
    open: false,
    message: "",
    severity: "success",
  });

  // Fetch unverified recipes on component mount
  useEffect(() => {
    const loadRecipes = async () => {
      setLoading(true);
      try {
        const data = await fetchUnVerifiedRecipes();
        setRecipes(data);
      } catch (error) {
        setSnackbar({ open: true, message: "Failed to fetch recipes.", severity: "error" });
      } finally {
        setLoading(false);
      }
    };

    loadRecipes();
  }, []);

  // Handle recipe approval
  const handleApprove = async (recipeId: string) => {
    try {
      await approveRecipe(recipeId);
      setRecipes((prev) => prev.filter((recipe) => recipe._id !== recipeId));
      setSnackbar({ open: true, message: "Recipe approved successfully.", severity: "success" });
    } catch (error) {
      setSnackbar({ open: true, message: "Failed to approve recipe.", severity: "error" });
    }
  };

  // Handle recipe rejection
  const handleReject = async (recipeId: string) => {
    try {
      await deleteRecipe(recipeId);
      setRecipes((prev) => prev.filter((recipe) => recipe._id !== recipeId));
      setSnackbar({ open: true, message: "Recipe rejected successfully.", severity: "success" });
    } catch (error) {
      setSnackbar({ open: true, message: "Failed to reject recipe.", severity: "error" });
    }
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        Manage Recipe Requests
      </Typography>

      {loading ? (
        <CircularProgress sx={{ display: "block", mx: "auto", mt: 4 }} />
      ) : (
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Title</TableCell>
                <TableCell>Description</TableCell>
                <TableCell>Ingredients</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {recipes.map((recipe) => (
                <TableRow key={recipe._id}>
                  <TableCell>{recipe.title}</TableCell>
                  <TableCell>{recipe.description || "N/A"}</TableCell>
                  <TableCell>
                    {recipe.ingredients.join(", ")}
                  </TableCell>
                  <TableCell>
                    <Button
                      variant="contained"
                      color="success"
                      onClick={() => handleApprove(recipe._id!)}
                      sx={{ mr: 2 }}
                    >
                      Approve
                    </Button>
                    <Button
                      variant="contained"
                      color="error"
                      onClick={() => handleReject(recipe._id!)}
                    >
                      Reject
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}

      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={() => setSnackbar((prev) => ({ ...prev, open: false }))}
      >
        <Alert
          onClose={() => setSnackbar((prev) => ({ ...prev, open: false }))}
          severity={snackbar.severity}
          sx={{ width: "100%" }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Container>
  );
}

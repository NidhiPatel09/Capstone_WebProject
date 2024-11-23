"use client";

import React, { useState } from "react";
import Blog from "@/types/Blog";
import savePosts from "@/actions/savePosts";

export default function BlogSavingForm({ authorId }: { authorId: any }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [readingTime, setReadingTime] = useState("");
  const [image, setImage] = useState("");
  const [categoryId, setCategoryId] = useState("");

  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Reset messages
    setSuccessMessage(null);
    setErrorMessage(null);
    console.log(title);
    console.log(description);
    console.log(readingTime);
    console.log(categoryId);

    // Validate fields
    if (!title || !description || !readingTime || !categoryId) {
      setErrorMessage("All fields are required.");
      return;
    }

    // Prepare the payload
    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("readingTime", readingTime);
    formData.append("categoryId", categoryId);

    try {
      const result = await savePosts({
        title,
        description,
        authorId,
        categoryId,
        readingTime: readingTime,
        image,
      });

      if (result.success) {
        setSuccessMessage("Blog post created successfully!");
        // Reset form fields
        setTitle("");
        setDescription("");
        setReadingTime("");
        setImage("");
        setCategoryId("");
      } else {
        setErrorMessage(
          result.message || "An error occurred while saving the blog."
        );
      }
    } catch (error: any) {
      setErrorMessage(error.message || "An unexpected error occurred.");
    }
  };

  return (
    <div className="bg-dark p-6 rounded shadow-md max-w-md w-full">
      <h2 className="text-2xl font-bold mb-4 text-center">Save Your Blog</h2>

      {successMessage && (
        <p className="text-green-500 mb-4">{successMessage}</p>
      )}
      {errorMessage && <p className="text-red-500 mb-4">{errorMessage}</p>}

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div className="relative bg-green">
          <input
            type="text"
            onChange={(e) =>
              setImage(e.target.value)
            }
          />
        </div>

        <div className="relative">
          <input
            type="text"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="p-2 pl-10 border rounded w-full text-black"
            required
          />
          <i className="fas fa-pencil-alt absolute left-3 top-1/2 transform -translate-y-1/2 text-black"></i>
        </div>

        <div className="relative">
          <input
            type="text"
            placeholder="Add Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="p-2 pl-10 border rounded w-full text-black"
            required
          />
          <i className="fas fa-pen absolute left-3 top-1/2 transform -translate-y-1/2 text-black"></i>
        </div>

        <div className="relative">
          <input
            type="text"
            placeholder="Reading Time (in minutes)"
            value={readingTime}
            onChange={(e) => setReadingTime(e.target.value)}
            className="p-2 pl-10 border rounded w-full text-black"
            required
          />
          <i className="fas fa-clock absolute left-3 top-1/2 transform -translate-y-1/2 text-black"></i>
        </div>

        <div className="relative">
          <select
            value={categoryId || "1"}
            onChange={(e) => setCategoryId(e.target.value)}
            className="p-2 pl-10 border rounded w-full text-black"
            required
          >
            <option value="1">Indian</option>
            <option value="2">Canadian</option>
          </select>
          <i className="fas fa-clock absolute left-3 top-1/2 transform -translate-y-1/2 text-black"></i>
        </div>

        <button
          type="submit"
          className="group relative w-full flex justify-center mt-2 py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-green-500 hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
        >
          Submit
        </button>
      </form>
    </div>
  );
}

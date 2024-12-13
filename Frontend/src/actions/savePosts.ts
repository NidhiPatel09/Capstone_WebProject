"use server";
import Blog from "@/types/Blog";
import axios from "axios";

export default async function savePosts(blog: Blog) {
  const backendPort = process.env.BACKEND_PORT || 5000;
  const backendBaseUrl = `${process.env.BACKEND_BASE_URL}${backendPort}`;
  const { title, description, authorId, categoryId, readingTime, image } = blog;
  try {
    const response = await axios.post(`${backendBaseUrl}/blog/create`, {
      title,
      description,
      authorId,
      categoryId,
      readingTime,
      image
    },{
        withCredentials:true
    });
    console.log(response.data);
    
    if (response.status === 201) {
      return response.data.message;
    }
  } catch (error: any) {
    console.log(error.response.data);
    return error.response.data.message;
  }
}

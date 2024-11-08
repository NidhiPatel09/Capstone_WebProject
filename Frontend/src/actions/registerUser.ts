"use server";
import axios from "axios";

export default async function registerUser(e: FormData) {
    const backendPort = process.env.BACKEND_PORT || 5000;
    const backendBaseUrl = `${process.env.BACKEND_BASE_URL}${backendPort}`;
  const email = e.get("email")?.toString();
  const password = e.get("password")?.toString();
  
  try {
    const response = await axios.post(`${backendBaseUrl}/auth/signup`, {
      email,
      password,
    });
    if(response.status === 201) {
        return response.data.message;
    }
  } catch (error: any) {
    console.log(error.response.data.message);
    return error.response.data.message;
  }
}

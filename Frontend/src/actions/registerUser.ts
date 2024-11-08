"use server";
import axios from "axios";

export default async function registerUser(email: string, password: string, firstname: string, lastname: string) {
    const backendPort = process.env.BACKEND_PORT || 5000;
    const backendBaseUrl = `${process.env.BACKEND_BASE_URL}${backendPort}`;
  
  try {
    const response = await axios.post(`${backendBaseUrl}/auth/signup`, {
      email,
      password,
      firstname,
      lastname
    });
    if(response.status === 201) {
        return response.data;
    }
  } catch (error: any) {
    console.log(error.response.data);
    return error.response.data;
  }
}

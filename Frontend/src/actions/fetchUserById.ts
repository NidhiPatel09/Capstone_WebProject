"use server";
import axios from "axios";
export default async function fetchUserById(userId: string) {
  const backendPort = process.env.BACKEND_PORT || 5000;
  const backendBaseUrl = `${process.env.BACKEND_BASE_URL}${backendPort}`;

  try {
    const response = await axios.get(`${backendBaseUrl}/user/getUserById/${userId}`);
    if (response.status === 200) {
      return response.data;
    }
  } catch (error: any) {
    console.log(error.response.data);
    return error.response.data;
  }
}

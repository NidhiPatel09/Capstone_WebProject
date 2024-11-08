"use server";

import axios from "axios";
import { cookies } from "next/headers";

export default async function userSession() {
  const backendPort = process.env.BACKEND_PORT || 5000;
  const backendBaseUrl = `${process.env.BACKEND_BASE_URL}${backendPort}`;

  try {
    const cookieStore = cookies();
    const cookieHeader = cookieStore
      .getAll()
      .map((cookie) => `${cookie.name}=${cookie.value}`)
      .join("; ");

    const user = await axios.get(`${backendBaseUrl}/auth/current-user`, {
      headers: {
        Cookie: cookieHeader,
      },
      withCredentials: true,
    });

    if (user.data) {
      console.log("User data retrieved successfully:", user.data);
      return user.data.user;
    } else {
      console.warn("No user data received.");
      return null;
    }
  } catch (error: any) {
    console.error("Error fetching user session:", error.message || error);
    return null;
  }
}

"use server";

import axios from "axios";
import { cookies } from "next/headers";

export default async function userSession() {
  const backendPort = process.env.BACKEND_PORT || 4000;
  const backendBaseUrl = `${process.env.BACKEND_BASE_URL}${backendPort}`;
  console.log("asddddddddd");
  try {
    const cookieStore = cookies();
    const cookieHeader = cookieStore
      .getAll()
      .map((cookie) => `${cookie.name}=${cookie.value}`)
      .join("; ");

    // Extract the token from the cookies
    const tokenCookie = cookieStore.get("token");
    const token = tokenCookie ? tokenCookie.value : "";

    console.log(token);

    const user = await axios.get(`${backendBaseUrl}/auth/current-user`, {
      headers: {
        Cookie: cookieHeader,
        Authorization: `Bearer ${token}`,
      },
      withCredentials: true,
    });
    console.log(user);

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

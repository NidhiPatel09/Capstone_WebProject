"use server";

import axios from "axios";

export default async function userSession() {
  const backendPort = process.env.BACKEND_PORT || 5000;
  const backendBaseUrl = `${process.env.BACKEND_BASE_URL}${backendPort}`;
  try {
    const user = await axios.get(`${backendBaseUrl}/auth/current-user`);

    if (user.data) {
      console.log(user.data.user);
      return user.data.user;
    }
  } catch (error) {
    console.error(error);
  }
}

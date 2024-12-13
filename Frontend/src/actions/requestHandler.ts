import axios from "axios";
import { cookies } from "next/headers";
const backendPort = process.env.BACKEND_PORT || 5000;
const backendBaseUrl = `${process.env.BACKEND_BASE_URL}${backendPort}`;
const cookieStore = cookies();
const cookieHeader = cookieStore
  .getAll()
  .map((cookie) => `${cookie.name}=${cookie.value}`)
  .join("; ");
export const apiClient = axios.create({
  baseURL: `${backendBaseUrl}`,
  headers: {
    Cookie: cookieHeader,
  },
  withCredentials: true,
});

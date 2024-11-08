"use client";

export default async function handleGoogleLogin() {
  const backendPort = process.env.BACKEND_PORT || 5000;
  const backendBaseUrl = `${process.env.BACKEND_BASE_URL}${backendPort}`;
  console.log(backendBaseUrl);
  
  window.location.href = `http://localhost:4000/auth/google`;
}

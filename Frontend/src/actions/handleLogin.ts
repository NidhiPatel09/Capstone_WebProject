"use client";

export async function handleGoogleLogin() {
  window.location.href = `http://localhost:4000/auth/google`;
}

export async function handleFacebookLogin() {
  window.location.href = `http://localhost:4000/auth/facebook`;
}
// client/src/services/auth.service.js
import { apiFetch } from "./api";

export async function loginAdmin(email, password) {
  return apiFetch("/auth/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",        // ← very important

    body: JSON.stringify({
      email,
      password,
    }),
  });
}

export async function logoutAdmin() {
  return apiFetch("/auth/logout", {
    method: "POST",
  });
}

export async function getCurrentUser() {
  return apiFetch("/auth/me");
}
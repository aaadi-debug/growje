// const API_URL = process.env.NEXT_PUBLIC_API_URL;

// export async function apiFetch(endpoint, options = {}) {
//   const response = await fetch(`${API_URL}${endpoint}`, {
//     ...options,

//     credentials: "include",

//     headers: {
//       "Content-Type": "application/json",
//       ...options.headers,
//     },

//     cache: "no-store",
//   });

//   let data;

//   try {
//     data = await response.json();
//   } catch {
//     data = {};
//   }

//   if (!response.ok) {
//     throw new Error(
//       data.message || "Something went wrong"
//     );
//   }

//   return data;
// }

// client/src/services/api.js
const API_URL = process.env.NEXT_PUBLIC_API_URL;

export async function apiFetch(endpoint, options = {}) {
  // Get token from localStorage (only in browser)
  const token =
    typeof window !== "undefined"
      ? localStorage.getItem("token")
      : null;

  const response = await fetch(`${API_URL}${endpoint}`, {
    ...options,
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      ...(token && { Authorization: `Bearer ${token}` }),
      ...options.headers,
    },
    cache: "no-store",
  });

  let data;
  try {
    data = await response.json();
  } catch {
    data = {};
  }

  if (!response.ok) {
    throw new Error(data.message || "Something went wrong");
  }

  return data;
}
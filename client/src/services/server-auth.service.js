// client/src/services/server-auth.service.js
import { cookies } from "next/headers";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export async function getServerCurrentUser() {
  const cookieStore = await cookies();

  const token = cookieStore.get("token");

  if (!token) {
    return null;
  }

  try {
    const response = await fetch(`${API_URL}/auth/me`, {
      method: "GET",

      headers: {
        Cookie: `token=${token.value}`,
      },

      cache: "no-store",
    });

    if (!response.ok) {
      return null;
    }

    const data = await response.json();

    return data.data;
  } catch (error) {
    console.error("Server authentication failed:", error);

    return null;
  }
}



// Now we have two authentication utilities:

// client/src/services/
// │
// ├── auth.service.js
// │      ↓
// │   Used by client-side components
// │
// └── server-auth.service.js
//        ↓
//     Used by Server Components
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import { loginAdmin } from "@/services/auth.service";

export default function AdminLoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      setError("");

      await loginAdmin(email, password);

      router.push("/admin");
      router.refresh();
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "400px",
          padding: "30px",
          border: "1px solid #ddd",
          borderRadius: "10px",
        }}
      >
        <h1>Admin Login</h1>

        <form onSubmit={handleSubmit}>
          <div style={{ marginTop: "20px" }}>
            <label>Email</label>

            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              style={{
                width: "100%",
                padding: "10px",
                marginTop: "5px",
              }}
            />
          </div>

          <div style={{ marginTop: "15px" }}>
            <label>Password</label>

            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              style={{
                width: "100%",
                padding: "10px",
                marginTop: "5px",
              }}
            />
          </div>

          {error && (
            <p
              style={{
                color: "red",
                marginTop: "15px",
              }}
            >
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            style={{
              width: "100%",
              padding: "12px",
              marginTop: "20px",
              cursor: "pointer",
            }}
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>
      </div>
    </main>
  );
}



// /admin/login
//       │
//       ▼
// Enter Email + Password
//       │
//       ▼
// POST /api/auth/login
//       │
//       ▼
// Express verifies credentials
//       │
//       ▼
// JWT generated
//       │
//       ▼
// HTTP-only cookie stored
//       │
//       ▼
// Redirect to /admin



// ---------------------------------------------
// After login:

// Login page
//     ↓
// POST /api/auth/login
//     ↓
// Express sets HTTP-only cookie
//     ↓
// router.push("/admin")
//     ↓
// AdminLayout
//     ↓
// Server reads cookie
//     ↓
// Express /auth/me
//     ↓
// User verified
//     ↓
// Dashboard
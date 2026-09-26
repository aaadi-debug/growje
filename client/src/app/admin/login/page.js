"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { FaStarOfLife } from "react-icons/fa6";

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
    <main className="min-h-[100vh] grid grid-cols-2">
      {/* left side */}
      <div className="bg-primary grid-cols-9 flex flex-col items-start justify-between 2xl:px-32 xl:px-24 px-16 py-20">
        <div>
          <FaStarOfLife size={80} className="text-white animate-[spin_8s_linear_infinite]" />

          <h1 className="text-7xl font-bold text-white mt-10 leading-20">Hello
            <br />
            <span className="text-white/80">
              GROWJE!
              <span className="inline-block ">👋</span>
            </span>
          </h1>
        </div>

        <p className="text-white/50">
          © {new Date().getFullYear()} Growje. All rights reserved.
        </p>
      </div>

      {/* right side */}
      <div className="relative overflow-hidden grid-cols-3 flex justify-start items-center 2xl:px-24 xl:px-16 px-10 py-20">
        <div
          className="pointer-events-none absolute -right-20 top-10 h-72 w-72 rounded-full bg-orange-300/30 blur-3xl"
          aria-hidden="true"
        />
        <div
          className="pointer-events-none absolute -left-16 bottom-10 h-80 w-80 rounded-full bg-teal-300/25 blur-3xl"
          aria-hidden="true"
        />

        {/* Optional light grid */}
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.65]
                    [background-image:linear-gradient(to_right,rgba(0,0,0,0.06)_1px,transparent_1px),linear-gradient(to_bottom,rgba(0,0,0,0.06)_1px,transparent_1px)]
                    [background-size:48px_48px]"
          aria-hidden="true"
        />

        <div className="relative">
          <h2 className="text-4xl font-bold mb-20">Admin Login</h2>

          <form onSubmit={handleSubmit}>
            <h3 className="text-black font-medium text-2xl">Welcome Back!</h3>
            <p className="text-gray-400 mt-3 text-sm">Dear admin, <br /> Access your admin panel by filling the credentials</p>

            <div className="mt-10">
              <label className="hidden">Email</label>

              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
                required
                className={`w-full border-b-2 focus:bg-primary/10 px-4 bg-transparent px-0 py-4 text-base outline-none transition placeholder:text-gray-400 ${error
                  ? "border-red-500"
                  : "border-black/20 focus:border-black"
                  }`}
              />
            </div>

            <div style={{ marginTop: "15px" }}>
              <label className="hidden">Password</label>

              <input
                type="password"
                value={password}
                placeholder="Password"
                onChange={(e) => setPassword(e.target.value)}
                required
                className={`w-full border-b-2 focus:bg-primary/10 px-4 bg-transparent px-0 py-4 text-base outline-none transition placeholder:text-gray-400 ${error
                  ? "border-red-500"
                  : "border-black/20 focus:border-black"
                  }`}
              />
            </div>

            {error && (
              <p className="text-red-500 mt-4"> {error} </p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full px-4 py-3 rounded-lg mt-10 cursor-pointer bg-black text-white hover:bg-primary transition duration-300"
            >
              {loading ? "Logging in..." : "Login"}
            </button>
          </form>
        </div>
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
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import { logoutAdmin } from "@/services/auth.service";

export default function AdminLogout() {
  const router = useRouter();

  const [loading, setLoading] = useState(false);

  const handleLogout = async () => {
    try {
      setLoading(true);

      await logoutAdmin();

      router.replace("/admin/login");
      router.refresh();
    } catch (error) {
      console.error("Logout failed:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handleLogout}
      disabled={loading}
      className="rounded-lg border px-4 py-2 text-sm font-medium transition hover:bg-black hover:text-white disabled:opacity-50 cursor-pointer"
    >
      {loading ? "Logging out..." : "Logout"}
    </button>
  );
}
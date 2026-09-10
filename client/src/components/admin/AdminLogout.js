"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { logoutAdmin } from "@/services/auth.service";
import { LogOut } from "lucide-react"

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
      className="rounded-lg text-sm font-medium transition text-white disabled:opacity-50 cursor-pointer"
      title="Logout"
    >
      {/* {loading ? "Logging out..." : "Logout"} */}
        <LogOut size={20} />
    </button>
  );
}
"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getCurrentUser } from "@/services/auth.service";

export default function AdminAuthGuard({ children }) {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const data = await getCurrentUser();
        if (data?.data?.role === "admin") {
          setUser(data.data);
        } else {
          router.replace("/admin/login");
        }
      } catch (error) {
        router.replace("/admin/login");
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, [router]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Loading...</p>
      </div>
    );
  }

  if (!user) return null;

  return children;
}
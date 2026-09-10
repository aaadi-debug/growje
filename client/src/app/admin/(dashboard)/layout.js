// client/src/app/admin/(dashboard)/layout.js
import { redirect } from "next/navigation";

import AdminSidebar from "@/components/admin/AdminSidebar";
import AdminHeader from "@/components/admin/AdminHeader";
import AdminAuthGuard from "@/components/admin/AdminAuthGuard";
import { getServerCurrentUser } from "@/services/server-auth.service";

export default function AdminDashboardLayout({ children }) {
  return (
    <AdminAuthGuard>
      <div className="min-h-screen bg-[#F3F3F9]">
        <AdminSidebar />

        <div className="ml-64 relative">
          <AdminHeader />
          <main className="pt-16">{children}</main>
        </div>
      </div>
    </AdminAuthGuard>
  );
}


// client/src/app/admin/(dashboard)/layout.js
import { redirect } from "next/navigation";

import AdminSidebar from "@/components/admin/AdminSidebar";
import AdminHeader from "@/components/admin/AdminHeader";
import { getServerCurrentUser } from "@/services/server-auth.service";

export default async function AdminDashboardLayout({
  children,
}) {
  const user = await getServerCurrentUser();

  if (!user || user.role !== "admin") {
    redirect("/admin/login");
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <AdminSidebar />

      <div className="ml-64">
        <AdminHeader user={user} />

        <main className="">
          {children}
        </main>
      </div>
    </div>
  );
}
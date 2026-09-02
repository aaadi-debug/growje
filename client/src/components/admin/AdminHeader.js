"use client";

import AdminLogout from "./AdminLogout";

export default function AdminHeader({ user }) {
  return (
    <header className="flex h-20 items-center justify-between border-b bg-white px-8">
      <div>
        <h1 className="text-lg font-semibold">
          Admin Panel
        </h1>

        <p className="text-sm text-gray-500">
          Manage your website content
        </p>
      </div>

      <div className="flex items-center gap-5">
        <div className="text-right">
          <p className="text-sm font-medium">
            {user?.name || "Anshul Rathore"}
          </p>

          <p className="text-xs text-gray-500">
            {user?.email}
          </p>
        </div>

        <AdminLogout />
      </div>
    </header>
  );
}
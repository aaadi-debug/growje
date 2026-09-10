"use client";

import AdminLogout from "./AdminLogout";


export default function AdminHeader({ user }) {
  return (
    // <header className="flex h-20 items-center justify-between border-b bg-white px-8 fixed w-[0%] z-10 top-0 left-64">
    <header className="flex justify-between border-b border-gray-100 shadow-sm bg-white px-8 fixed left-64 right-0 z-10 top-0">
      <div className="py-2">
        <h1 className="text-lg font-semibold">
          Admin Panel Dashboard
        </h1>

        <p className="text-sm text-gray-500">
          Manage your website content
        </p>
      </div>

      <div className="flex items-center bg-gray-200 px-3">
        <div className="flex gap-2 items-center">
          <div className="h-8 w-8 bg-gray-300 rounded-full"></div>
          <div>
            <p className="text-sm leading-2 pt-2">{user?.name || "Anshul Rathore"}</p>
            <p>{user?.email}</p>
            <span className="text-xs text-gray-500">Founder</span>
          </div>
        </div>
      </div>
    </header>
  );
}
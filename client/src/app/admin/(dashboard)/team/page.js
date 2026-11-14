"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Pencil, Trash2, Plus } from "lucide-react";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export default function TeamAdminPage() {
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState(null);

  const fetchMembers = async () => {
    try {
      const res = await fetch(`${API_URL}/team`, { credentials: "include" });
      const data = await res.json();
      if (data.success) setMembers(data.members || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMembers();
  }, []);

  const handleDelete = async (id, name) => {
    if (!window.confirm(`Delete "${name}"?`)) return;

    try {
      setDeletingId(id);
      const res = await fetch(`${API_URL}/team/${id}`, {
        method: "DELETE",
        credentials: "include",
      });
      const data = await res.json();
      if (!res.ok) {
        alert(data.message || "Failed to delete");
        return;
      }
      setMembers((prev) => prev.filter((m) => m._id !== id));
    } catch (err) {
      alert("Something went wrong");
    } finally {
      setDeletingId(null);
    }
  };

  if (loading) return <div className="p-8">Loading team...</div>;

  return (
    <div className="p-8">
      <div className="flex items-end justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold">Team</h1>
          <p className="text-gray-500 text-sm">Manage “Meet the Makers”</p>
        </div>
        <Link
          href="/admin/team/new"
          className="flex gap-1 items-center bg-black text-white px-3 py-2 text-xs rounded-lg hover:bg-zinc-700 transition"
        >
          <Plus size={14} />
          Add Member
        </Link>
      </div>

      {members.length === 0 ? (
        <div className="border rounded-xl p-10 text-center">
          <h2 className="text-xl font-semibold">No team members yet</h2>
          <Link
            href="/admin/team/new"
            className="inline-block mt-5 bg-black text-white px-5 py-3 rounded-lg"
          >
            Add Member
          </Link>
        </div>
      ) : (
        <div className="bg-white border rounded-xl overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-200">
              <tr>
                <th className="text-left px-6 py-4">Photo</th>
                <th className="text-left px-6 py-4">Name</th>
                <th className="text-left px-6 py-4">Profession</th>
                <th className="text-left px-6 py-4">Special</th>
                <th className="text-left px-6 py-4">Status</th>
                <th className="text-left px-6 py-4">Order</th>
                <th className="text-right px-6 py-4">Actions</th>
              </tr>
            </thead>
            <tbody>
              {members.map((m) => (
                <tr key={m._id} className="border-t">
                  <td className="px-6 py-4">
                    {m.photo?.url ? (
                      <img
                        src={m.photo.url}
                        alt={m.name}
                        className="h-12 w-12 rounded-full object-cover"
                      />
                    ) : (
                      "—"
                    )}
                  </td>
                  <td className="px-6 py-4 font-medium">{m.name}</td>
                  <td className="px-6 py-4 text-sm text-gray-500">
                    {m.profession || "—"}
                  </td>
                  <td className="px-6 py-4 text-sm">{m.specialName || "—"}</td>
                  <td className="px-6 py-4">
                    <span
                      className={`px-3 py-1 capitalize rounded-full text-sm ${
                        m.status === "published"
                          ? "bg-green-100 text-green-700"
                          : "bg-yellow-100 text-yellow-700"
                      }`}
                    >
                      {m.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">{m.order}</td>
                  <td className="px-6 py-4">
                    <div className="flex justify-end gap-3">
                      <Link
                        href={`/admin/team/${m._id}/edit`}
                        className="text-blue-600 border-2 p-1 rounded"
                      >
                        <Pencil size={16} />
                      </Link>
                      <button
                        onClick={() => handleDelete(m._id, m.name)}
                        disabled={deletingId === m._id}
                        className="text-red-600 border-2 p-1 rounded disabled:opacity-50"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
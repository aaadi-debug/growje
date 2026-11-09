"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Pencil, Trash2, Plus } from "lucide-react";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export default function ClientsAdminPage() {
  const [clients, setClients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState(null);

  const fetchClients = async () => {
    try {
      const res = await fetch(`${API_URL}/clients`, { credentials: "include" });
      const data = await res.json();
      if (data.success) setClients(data.clients || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchClients();
  }, []);

  const handleDelete = async (id, name) => {
    if (!window.confirm(`Delete client "${name}"?`)) return;

    try {
      setDeletingId(id);
      const res = await fetch(`${API_URL}/clients/${id}`, {
        method: "DELETE",
        credentials: "include",
      });
      const data = await res.json();
      if (!res.ok) {
        alert(data.message || "Failed to delete");
        return;
      }
      setClients((prev) => prev.filter((c) => c._id !== id));
    } catch (err) {
      alert("Something went wrong");
    } finally {
      setDeletingId(null);
    }
  };

  if (loading) return <div className="p-8">Loading clients...</div>;

  return (
    <div className="p-8">
      <div className="flex items-end justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold">Clients</h1>
          <p className="text-gray-500 text-sm">
            Logos shown in the homepage clientele marquee
          </p>
        </div>
        <Link
          href="/admin/clients/new"
          className="flex gap-1 items-center bg-black text-white px-3 py-2 text-xs rounded-lg hover:bg-zinc-700 transition"
        >
          <Plus size={14} />
          Add Client
        </Link>
      </div>

      {clients.length === 0 ? (
        <div className="border rounded-xl p-10 text-center">
          <h2 className="text-xl font-semibold">No clients yet</h2>
          <p className="text-gray-500 mt-2">Add your first client logo.</p>
          <Link
            href="/admin/clients/new"
            className="inline-block mt-5 bg-black text-white px-5 py-3 rounded-lg"
          >
            Add Client
          </Link>
        </div>
      ) : (
        <div className="bg-white border rounded-xl overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-200">
              <tr>
                <th className="text-left px-6 py-4">Logo</th>
                <th className="text-left px-6 py-4">Name</th>
                <th className="text-left px-6 py-4">Status</th>
                <th className="text-left px-6 py-4">Order</th>
                <th className="text-right px-6 py-4">Actions</th>
              </tr>
            </thead>
            <tbody>
              {clients.map((client) => (
                <tr key={client._id} className="border-t">
                  <td className="px-6 py-4">
                    {client.logo?.url ? (
                      <img
                        src={client.logo.url}
                        alt={client.name}
                        className="h-10 w-auto object-contain"
                      />
                    ) : (
                      "—"
                    )}
                  </td>
                  <td className="px-6 py-4 font-medium">{client.name}</td>
                  <td className="px-6 py-4">
                    <span
                      className={`px-3 py-1 capitalize rounded-full text-sm ${
                        client.status === "published"
                          ? "bg-green-100 text-green-700"
                          : "bg-yellow-100 text-yellow-700"
                      }`}
                    >
                      {client.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">{client.order}</td>
                  <td className="px-6 py-4">
                    <div className="flex justify-end gap-3">
                      <Link
                        href={`/admin/clients/${client._id}/edit`}
                        className="text-blue-600 border-2 p-1 rounded"
                      >
                        <Pencil size={16} />
                      </Link>
                      <button
                        onClick={() => handleDelete(client._id, client.name)}
                        disabled={deletingId === client._id}
                        className="text-red-600 border-2 p-1 rounded disabled:opacity-50 cursor-pointer"
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
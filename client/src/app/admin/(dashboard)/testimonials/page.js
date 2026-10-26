"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Pencil, Trash2, Plus, Star } from "lucide-react";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export default function TestimonialsAdminPage() {
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState(null);

  const fetchTestimonials = async () => {
    try {
      const res = await fetch(`${API_URL}/testimonials`, {
        credentials: "include",
      });
      const data = await res.json();
      if (data.success) setTestimonials(data.testimonials || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTestimonials();
  }, []);

  const handleDelete = async (id, name) => {
    if (!window.confirm(`Delete testimonial from "${name}"?`)) return;

    try {
      setDeletingId(id);
      const res = await fetch(`${API_URL}/testimonials/${id}`, {
        method: "DELETE",
        credentials: "include",
      });
      const data = await res.json();
      if (!res.ok) {
        alert(data.message || "Failed to delete");
        return;
      }
      setTestimonials((prev) => prev.filter((t) => t._id !== id));
    } catch (err) {
      alert("Something went wrong");
    } finally {
      setDeletingId(null);
    }
  };

  if (loading) return <div className="p-8">Loading testimonials...</div>;

  return (
    <div className="p-8">
      <div className="flex items-end justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold">Testimonials</h1>
          <p className="text-gray-500 text-sm">
            Manage client reviews shown on the homepage
          </p>
        </div>
        <Link
          href="/admin/testimonials/new"
          className="flex gap-1 items-center bg-black text-white px-3 py-2 text-xs rounded-lg hover:bg-zinc-700 transition"
        >
          <Plus size={14} />
          Add Testimonial
        </Link>
      </div>

      {testimonials.length === 0 ? (
        <div className="border rounded-xl p-10 text-center">
          <h2 className="text-xl font-semibold">No testimonials yet</h2>
          <p className="text-gray-500 mt-2">Add your first client review.</p>
          <Link
            href="/admin/testimonials/new"
            className="inline-block mt-5 bg-black text-white px-5 py-3 rounded-lg"
          >
            Add Testimonial
          </Link>
        </div>
      ) : (
        <div className="bg-white border rounded-xl overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-200">
              <tr>
                <th className="text-left px-6 py-4">Name</th>
                <th className="text-left px-6 py-4">Role</th>
                <th className="text-left px-6 py-4">Content</th>
                <th className="text-left px-6 py-4">Rating</th>
                <th className="text-left px-6 py-4">Status</th>
                <th className="text-left px-6 py-4">Order</th>
                <th className="text-right px-6 py-4">Actions</th>
              </tr>
            </thead>
            <tbody>
              {testimonials.map((item) => (
                <tr key={item._id} className="border-t">
                  <td className="px-6 py-4 font-medium">{item.name}</td>
                  <td className="px-6 py-4 text-gray-500 text-sm">
                    {item.role || "—"}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600 max-w-xs truncate">
                    {item.content}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex gap-0.5">
                      {[...Array(item.rating || 5)].map((_, i) => (
                        <Star
                          key={i}
                          size={14}
                          className="fill-yellow-400 text-yellow-400"
                        />
                      ))}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`px-3 py-1 capitalize rounded-full text-sm ${
                        item.status === "published"
                          ? "bg-green-100 text-green-700"
                          : "bg-yellow-100 text-yellow-700"
                      }`}
                    >
                      {item.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">{item.order}</td>
                  <td className="px-6 py-4">
                    <div className="flex justify-end gap-3">
                      <Link
                        href={`/admin/testimonials/${item._id}/edit`}
                        className="text-blue-600 border-2 p-1 rounded"
                      >
                        <Pencil size={16} />
                      </Link>
                      <button
                        onClick={() => handleDelete(item._id, item.name)}
                        disabled={deletingId === item._id}
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
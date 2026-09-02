"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Pencil, Trash2 } from "lucide-react"

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export default function ServicesPage() {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState(null);

  const fetchServices = async () => {
    try {
      const response = await fetch(
        `${API_URL}/services`,
        {
          credentials: "include",
        }
      );

      const data = await response.json();

      if (data.success) {
        setServices(data.services);
      }
    } catch (error) {
      console.error("Failed to fetch services:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchServices();
  }, []);

  const handleDelete = async (id, title) => {
    const confirmed = window.confirm(
      `Are you sure you want to delete "${title}"?`
    );

    if (!confirmed) return;

    try {
      setDeletingId(id);

      const response = await fetch(
        `${API_URL}/services/${id}`,
        {
          method: "DELETE",
          credentials: "include",
        }
      );

      const data = await response.json();

      if (!response.ok) {
        alert(data.message || "Failed to delete service");
        return;
      }

      setServices((prev) =>
        prev.filter((service) => service._id !== id)
      );
    } catch (error) {
      console.error("Delete Service Error:", error);
      alert("Something went wrong");
    } finally {
      setDeletingId(null);
    }
  };

  if (loading) {
    return (
      <div className="p-8">
        Loading services...
      </div>
    );
  }

  return (
    <div className="p-8">
      <div className="flex items-start justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold">Services</h1>
          <p className="text-gray-500 text-sm">Manage your services and service pages.</p>
        </div>

        <Link
          href="/admin/services/new"
          className="bg-black text-white px-5 py-3 rounded-lg hover:bg-zinc-700 transition duration-300"
        >
          + Add Service
        </Link>
      </div>

      {services.length === 0 ? (
        <div className="border rounded-xl p-10 text-center">
          <h2 className="text-xl font-semibold">
            No services found
          </h2>

          <p className="text-gray-500 mt-2">
            Create your first service.
          </p>

          <Link
            href="/admin/services/new"
            className="inline-block mt-5 bg-black text-white px-5 py-3 rounded-lg"
          >
            Create Service
          </Link>
        </div>
      ) : (
        <div className="bg-white border rounded-xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-200">
                <tr>
                  <th className="text-left px-6 py-4">
                    Service
                  </th>

                  <th className="text-left px-6 py-4">
                    Slug
                  </th>

                  <th className="text-left px-6 py-4">
                    Status
                  </th>

                  <th className="text-left px-6 py-4">
                    Order
                  </th>

                  <th className="text-right px-6 py-4">
                    Actions
                  </th>
                </tr>
              </thead>

              <tbody>
                {services.map((service) => (
                  <tr
                    key={service._id}
                    className="border-t"
                  >
                    <td className="px-6 py-4 font-medium">
                      {service.title}
                    </td>

                    <td className="px-6 py-4 text-gray-500">
                      {service.slug}
                    </td>

                    <td className="px-6 py-4">
                      <span
                        className={`px-3 py-1 capitalize rounded-full text-sm ${
                          service.status === "published"
                            ? "bg-green-100 text-green-700"
                            : "bg-yellow-100 text-yellow-700"
                        }`}
                      >
                        {service.status}
                      </span>
                    </td>

                    <td className="px-6 py-4">
                      {service.order}
                    </td>

                    <td className="px-6 py-4">
                      <div className="flex justify-end gap-3">
                        <Link
                          href={`/admin/services/${service._id}/edit`}
                          className="text-blue-600 hover:underline border-2 p-1 rounded"
                          title="Edit"
                        >
                          <Pencil size={16} />
                        </Link>

                        <button
                          onClick={() =>
                            handleDelete(
                              service._id,
                              service.title
                            )
                          }
                          disabled={
                            deletingId === service._id
                          }
                          className="text-red-600 hover:underline disabled:opacity-50 border-2 p-1 rounded cursor-pointer"
                          title="Delete"
                        >
                          {deletingId === service._id
                            ? "Deleting..."
                            : <Trash2 size={16} />}
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
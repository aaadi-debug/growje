"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Pencil, Trash2 } from "lucide-react"

const API_URL =
  process.env.NEXT_PUBLIC_API_URL;

export default function ProjectsPage() {
  const [projects, setProjects] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  const [deletingId, setDeletingId] =
    useState(null);

  const fetchProjects = async () => {
    try {
      const response = await fetch(
        `${API_URL}/projects`,
        {
          credentials: "include",
        }
      );

      const data = await response.json();

      if (data.success) {
        setProjects(data.projects);
      }
    } catch (error) {
      console.error(
        "Fetch Projects Error:",
        error
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const handleDelete = async (
    id,
    title
  ) => {
    const confirmed = window.confirm(
      `Delete "${title}"?`
    );

    if (!confirmed) return;

    try {
      setDeletingId(id);

      const response = await fetch(
        `${API_URL}/projects/${id}`,
        {
          method: "DELETE",
          credentials: "include",
        }
      );

      const data =
        await response.json();

      if (!response.ok) {
        alert(
          data.message ||
          "Failed to delete project"
        );

        return;
      }

      setProjects((prev) =>
        prev.filter(
          (project) =>
            project._id !== id
        )
      );
    } catch (error) {
      console.error(
        "Delete Project Error:",
        error
      );
    } finally {
      setDeletingId(null);
    }
  };

  const SERVICE_COLORS = [
    "bg-blue-100 text-blue-700",
    "bg-purple-100 text-purple-700",
    "bg-pink-100 text-pink-700",
    "bg-emerald-100 text-emerald-700",
    "bg-amber-100 text-amber-700",
    "bg-cyan-100 text-cyan-700",
    "bg-indigo-100 text-indigo-700",
    "bg-rose-100 text-rose-700",
    "bg-teal-100 text-teal-700",
    "bg-orange-100 text-orange-700",
  ];

  function getServiceColor(key) {
    if (!key) return "bg-gray-100 text-gray-700";

    // Simple stable hash → same id always gets same color
    let hash = 0;
    const str = String(key);
    for (let i = 0; i < str.length; i++) {
      hash = (hash + str.charCodeAt(i) * (i + 1)) % SERVICE_COLORS.length;
    }

    return SERVICE_COLORS[hash];
  }

  if (loading) {
    return (
      <div className="p-8">
        Loading projects...
      </div>
    );
  }

  return (
    <div className="p-8">
      <div className="flex items-start justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold">Projects</h1>
          <p className="text-gray-500 text-sm">Manage portfolio projects.</p>
        </div>

        <Link
          href="/admin/projects/new"
          className="bg-black text-white px-5 py-3 rounded-lg hover:bg-zinc-700 transition duration-300"
        >
          + Add Project
        </Link>
      </div>

      {projects.length === 0 ? (
        <div className="border rounded-xl p-10 text-center">
          <h2 className="text-xl font-semibold">
            No projects yet
          </h2>

          <Link
            href="/admin/projects/new"
            className="inline-block mt-5 bg-black text-white px-5 py-3 rounded-lg"
          >
            Create Project
          </Link>
        </div>
      ) : (
        <div className="border rounded-xl overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-200">
              <tr>
                <th className="text-left p-4">
                  Project
                </th>

                <th className="text-left p-4">
                  Client
                </th>

                <th className="text-left p-4">
                  Services
                </th>

                <th className="text-left p-4">
                  Status
                </th>

                <th className="text-right p-4">
                  Actions
                </th>
              </tr>
            </thead>

            <tbody>
              {projects.map((project) => (
                <tr
                  key={project._id}
                  className="border-t"
                >
                  <td className="p-4">
                    <div className="font-medium">
                      {project.title}
                    </div>

                    <div className="text-sm text-gray-500">
                      {project.slug}
                    </div>
                  </td>

                  <td className="p-4">
                    {project.clientName ||
                      "-"}
                  </td>

                  <td className="p-4">
                    <div className="flex flex-wrap gap-2">
                      {/* {project.services?.map(
                        (service) => (
                          <span
                            key={service._id}
                            className="bg-gray-100 px-3 py-1 rounded-full text-sm"
                          >
                            {service.title}
                          </span>
                        )
                      )} */}
                      {project.services?.map((service) => (
                        <span
                          key={service._id}
                          className={`px-3 py-1 rounded-full text-sm ${getServiceColor(
                            service._id || service.title
                          )}`}
                        >
                          {service.title}
                        </span>
                      ))}
                    </div>
                  </td>

                  <td className="p-4">
                    <span
                      className={`px-3 py-1 capitalize rounded-full text-sm ${project.status === "published"
                        ? "bg-green-100 text-green-700"
                        : "bg-yellow-100 text-yellow-700"
                        }`}
                    >
                      {project.status}
                    </span>
                  </td>

                  <td className="p-4">
                    <div className="flex justify-end gap-4">
                      <Link
                        href={`/admin/projects/${project._id}/edit`}
                        className="text-blue-600 hover:underline border-2 p-1 rounded"
                        title="Edit"
                      >
                        <Pencil size={16} />
                      </Link>

                      <button
                        onClick={() =>
                          handleDelete(
                            project._id,
                            project.title
                          )
                        }
                        disabled={
                          deletingId ===
                          project._id
                        }
                        className="text-red-600 hover:underline disabled:opacity-50 border-2 p-1 rounded cursor-pointer"
                        title="Delete"
                      >
                        {deletingId ===
                          project._id
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
      )}
    </div>
  );
}
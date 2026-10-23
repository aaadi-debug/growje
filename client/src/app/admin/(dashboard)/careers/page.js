"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Pencil, Trash2, Plus } from "lucide-react";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export default function CareersAdminPage() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState(null);

  const fetchJobs = async () => {
    try {
      const res = await fetch(`${API_URL}/jobs`, { credentials: "include" });
      const data = await res.json();
      if (data.success) setJobs(data.jobs || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  const handleDelete = async (id, title) => {
    if (!window.confirm(`Delete "${title}"?`)) return;

    try {
      setDeletingId(id);
      const res = await fetch(`${API_URL}/jobs/${id}`, {
        method: "DELETE",
        credentials: "include",
      });
      const data = await res.json();
      if (!res.ok) {
        alert(data.message || "Failed to delete");
        return;
      }
      setJobs((prev) => prev.filter((j) => j._id !== id));
    } catch (err) {
      alert("Something went wrong");
    } finally {
      setDeletingId(null);
    }
  };

  if (loading) return <div className="p-8">Loading jobs...</div>;

  return (
    <div className="p-8">
      <div className="flex items-end justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold">Careers</h1>
          <p className="text-gray-500 text-sm">Manage job openings</p>
        </div>
        <Link
          href="/admin/careers/new"
          className="flex gap-1 items-center bg-black text-white px-3 py-2 text-xs rounded-lg hover:bg-zinc-700 transition"
        >
          <Plus size={14} />
          Add Job
        </Link>
      </div>

      {jobs.length === 0 ? (
        <div className="border rounded-xl p-10 text-center">
          <h2 className="text-xl font-semibold">No jobs yet</h2>
          <p className="text-gray-500 mt-2">Create your first job opening.</p>
          <Link
            href="/admin/careers/new"
            className="inline-block mt-5 bg-black text-white px-5 py-3 rounded-lg"
          >
            Create Job
          </Link>
        </div>
      ) : (
        <div className="bg-white border rounded-xl overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-200">
              <tr>
                <th className="text-left px-6 py-4">Title</th>
                <th className="text-left px-6 py-4">Department</th>
                <th className="text-left px-6 py-4">Location</th>
                <th className="text-left px-6 py-4">Type</th>
                <th className="text-left px-6 py-4">Status</th>
                <th className="text-left px-6 py-4">Order</th>
                <th className="text-right px-6 py-4">Actions</th>
              </tr>
            </thead>
            <tbody>
              {jobs.map((job) => (
                <tr key={job._id} className="border-t">
                  <td className="px-6 py-4 font-medium">{job.title}</td>
                  <td className="px-6 py-4 text-gray-500">{job.department || "—"}</td>
                  <td className="px-6 py-4 text-gray-500">{job.location}</td>
                  <td className="px-6 py-4 capitalize text-sm">{job.employmentType}</td>
                  <td className="px-6 py-4">
                    <span
                      className={`px-3 py-1 capitalize rounded-full text-sm ${
                        job.status === "published"
                          ? "bg-green-100 text-green-700"
                          : "bg-yellow-100 text-yellow-700"
                      }`}
                    >
                      {job.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">{job.order}</td>
                  <td className="px-6 py-4">
                    <div className="flex justify-end gap-3">
                      <Link
                        href={`/admin/careers/${job._id}/edit`}
                        className="text-blue-600 border-2 p-1 rounded"
                      >
                        <Pencil size={16} />
                      </Link>
                      <button
                        onClick={() => handleDelete(job._id, job.title)}
                        disabled={deletingId === job._id}
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
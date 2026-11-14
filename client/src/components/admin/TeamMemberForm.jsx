"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ChevronLeft } from "lucide-react";
import MediaUpload from "@/components/admin/MediaUpload"; // adjust path

const API_URL = process.env.NEXT_PUBLIC_API_URL;

const defaultForm = {
  name: "",
  profession: "",
  specialName: "",
  description: "",
  photo: { url: "", publicId: "", alt: "" },
  order: 0,
  status: "draft",
};

export default function TeamMemberForm({
  mode = "create",
  initialData = null,
  id = null,
}) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState(() => {
    if (mode === "edit" && initialData) {
      return {
        name: initialData.name || "",
        profession: initialData.profession || "",
        specialName: initialData.specialName || "",
        description: initialData.description || "",
        photo: initialData.photo || { url: "", publicId: "", alt: "" },
        order: initialData.order ?? 0,
        status: initialData.status || "draft",
      };
    }
    return defaultForm;
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "order" ? Number(value) : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name.trim()) {
      alert("Name is required");
      return;
    }

    try {
      setLoading(true);

      const url =
        mode === "edit" ? `${API_URL}/team/${id}` : `${API_URL}/team`;

      const res = await fetch(url, {
        method: mode === "edit" ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.message || "Failed to save");
        return;
      }

      router.push("/admin/team");
      router.refresh();
    } catch (err) {
      alert("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto relative p-8 max-w-2xl">
      <div className="mb-8 flex items-start gap-4">
        <button
          type="button"
          onClick={() => router.push("/admin/team")}
          className="bg-black text-white p-2 rounded-full hover:bg-zinc-700"
        >
          <ChevronLeft size={16} />
        </button>
        <div>
          <h1 className="text-2xl font-bold">
            {mode === "edit" ? "Edit Team Member" : "Add Team Member"}
          </h1>
          <p className="text-gray-500 text-sm">
            {mode === "edit"
              ? "Update team member details"
              : "Add a new member to the team section"}
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <section className="rounded-xl bg-white border border-gray-200 pb-4">
          <h2 className="font-medium mb-2 bg-primary px-4 py-2 rounded-t-xl text-white">
            Member Details
          </h2>

          <div className="space-y-4 px-4 pt-2">
            <div>
              <label className="block text-xs mb-1">Name *</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Barsha"
                className="w-full border rounded-lg px-3 py-2 text-sm"
              />
            </div>

            <div>
              <label className="block text-xs mb-1">Profession</label>
              <input
                type="text"
                name="profession"
                value={formData.profession}
                onChange={handleChange}
                placeholder="Hiring Manager"
                className="w-full border rounded-lg px-3 py-2 text-sm"
              />
            </div>

            <div>
              <label className="block text-xs mb-1">Special name</label>
              <input
                type="text"
                name="specialName"
                value={formData.specialName}
                onChange={handleChange}
                placeholder="HR"
                className="w-full border rounded-lg px-3 py-2 text-sm"
              />
            </div>

            <div>
              <label className="block text-xs mb-1">Description</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows={4}
                placeholder="Short bio..."
                className="w-full border rounded-lg px-3 py-2 text-sm"
              />
            </div>

            <div className="max-w-xs">
              <MediaUpload
                label="Photo"
                value={formData.photo}
                onChange={(media) =>
                  setFormData((prev) => ({
                    ...prev,
                    photo: {
                      url: media.url || "",
                      publicId: media.publicId || "",
                      alt: media.alt || prev.name || "",
                    },
                  }))
                }
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs mb-1">Order</label>
                <input
                  type="number"
                  name="order"
                  value={formData.order}
                  onChange={handleChange}
                  className="w-full border rounded-lg px-3 py-2 text-sm"
                />
              </div>
              <div>
                <label className="block text-xs mb-1">Status</label>
                <select
                  name="status"
                  value={formData.status}
                  onChange={handleChange}
                  className="w-full border rounded-lg px-3 py-2 text-sm"
                >
                  <option value="draft">Draft</option>
                  <option value="published">Published</option>
                </select>
              </div>
            </div>
          </div>
        </section>

        <div className="flex justify-end gap-4">
          <button
            type="button"
            onClick={() => router.push("/admin/team")}
            className="border px-4 py-2 rounded-lg text-sm"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={loading}
            className="bg-black text-white px-5 py-3 rounded-lg disabled:opacity-50"
          >
            {loading
              ? mode === "edit"
                ? "Saving..."
                : "Creating..."
              : mode === "edit"
              ? "Save Changes"
              : "Add Member"}
          </button>
        </div>
      </form>
    </div>
  );
}
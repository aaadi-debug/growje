"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ChevronLeft } from "lucide-react";
import MediaUpload from "@/components/admin/MediaUpload"; // adjust path if needed

const API_URL = process.env.NEXT_PUBLIC_API_URL;

const defaultForm = {
  name: "",
  logo: { url: "", publicId: "", alt: "" },
  website: "",
  order: 0,
  status: "draft",
};

export default function ClientForm({
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
        logo: initialData.logo || { url: "", publicId: "", alt: "" },
        website: initialData.website || "",
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
      alert("Client name is required");
      return;
    }
    if (!formData.logo?.url) {
      alert("Logo is required");
      return;
    }

    try {
      setLoading(true);

      const url =
        mode === "edit"
          ? `${API_URL}/clients/${id}`
          : `${API_URL}/clients`;

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

      router.push("/admin/clients");
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
          onClick={() => router.push("/admin/clients")}
          className="bg-black text-white p-2 rounded-full hover:bg-zinc-700 cursor-pointer"
        >
          <ChevronLeft size={16} />
        </button>
        <div>
          <h1 className="text-2xl font-bold">
            {mode === "edit" ? "Edit Client" : "Add Client"}
          </h1>
          <p className="text-gray-500 text-sm">
            {mode === "edit"
              ? "Update client logo"
              : "Add a client logo for the homepage marquee"}
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <section className="rounded-xl bg-white border border-gray-200 pb-4">
          <h2 className="font-medium mb-2 bg-primary px-4 py-2 rounded-t-xl text-white">
            Client Details
          </h2>

          <div className="space-y-4 px-4 pt-2">
            <div>
              <label className="block text-xs mb-1">Client name *</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Bundela"
                className="w-full border rounded-lg px-3 py-2 text-sm"
              />
            </div>

            <div>
              <label className="block text-xs mb-1">Website (optional)</label>
              <input
                type="url"
                name="website"
                value={formData.website}
                onChange={handleChange}
                placeholder="https://example.com"
                className="w-full border rounded-lg px-3 py-2 text-sm"
              />
            </div>

            <div className="max-w-xs">
              <MediaUpload
                label="Client Logo *"
                value={formData.logo}
                onChange={(media) =>
                  setFormData((prev) => ({
                    ...prev,
                    logo: {
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
            onClick={() => router.push("/admin/clients")}
            className="border px-4 py-2 rounded-lg text-sm cursor-pointer"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={loading}
            className="bg-black text-white px-5 py-3 rounded-lg disabled:opacity-50 cursor-pointer"
          >
            {loading
              ? mode === "edit"
                ? "Saving..."
                : "Creating..."
              : mode === "edit"
              ? "Save Changes"
              : "Add Client"}
          </button>
        </div>
      </form>
    </div>
  );
}
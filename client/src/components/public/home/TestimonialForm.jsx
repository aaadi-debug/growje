"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ChevronLeft } from "lucide-react";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

const defaultForm = {
  name: "",
  company: "",
  position: "",
  content: "",
  rating: 5,
  reviewTime: "",
  order: 0,
  status: "draft",
};

export default function TestimonialForm({
  mode = "create", // "create" | "edit"
  initialData = null,
  id = null,
}) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState(() => {
    if (mode === "edit" && initialData) {
      return {
        name: initialData.name || "",
        company: initialData.company || "",
        position: initialData.position || "",
        content: initialData.content || "",
        rating: initialData.rating || 5,
        reviewTime: initialData.reviewTime || "",
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
      [name]: name === "rating" || name === "order" ? Number(value) : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name.trim() || !formData.content.trim()) {
      alert("Name and content are required");
      return;
    }

    try {
      setLoading(true);

      const url =
        mode === "edit"
          ? `${API_URL}/testimonials/${id}`
          : `${API_URL}/testimonials`;

      const res = await fetch(url, {
        method: mode === "edit" ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.message || `Failed to ${mode === "edit" ? "update" : "create"}`);
        return;
      }

      router.push("/admin/testimonials");
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
          onClick={() => router.push("/admin/testimonials")}
          className="bg-black text-white p-2 rounded-full hover:bg-zinc-700"
        >
          <ChevronLeft size={16} />
        </button>
        <div>
          <h1 className="text-2xl font-bold">
            {mode === "edit" ? "Edit Testimonial" : "Add Testimonial"}
          </h1>
          <p className="text-gray-500 text-sm">
            {mode === "edit"
              ? "Update this client review"
              : "Create a new client review"}
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <section className="rounded-xl bg-white border border-gray-200 pb-4">
          <h2 className="font-medium mb-2 bg-primary px-4 py-2 rounded-t-xl text-white">
            Testimonial Details
          </h2>

          <div className="space-y-4 px-4 pt-2">
            <div>
              <label className="block text-xs mb-1">Name *</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Yashika"
                className="w-full border rounded-lg px-3 py-2 text-sm"
              />
            </div>

            <div>
              <label className="block text-xs mb-1">Company</label>
              <input
                type="text"
                name="company"
                value={formData.company}
                onChange={handleChange}
                placeholder="Growje"
                className="w-full border rounded-lg px-3 py-2 text-sm"
              />
            </div>

            <div>
              <label className="block text-xs mb-1">Position</label>
              <input
                type="text"
                name="position"
                value={formData.position}
                onChange={handleChange}
                placeholder="Marketing Manager"
                className="w-full border rounded-lg px-3 py-2 text-sm"
              />
            </div>

            <div>
              <label className="block text-xs mb-1">Content *</label>
              <textarea
                name="content"
                value={formData.content}
                onChange={handleChange}
                rows={4}
                placeholder="Working with this team completely transformed..."
                className="w-full border rounded-lg px-3 py-2 text-sm"
              />
            </div>

            <div>
              <label className="block text-xs mb-1">Review time</label>
              <input
                type="text"
                name="reviewTime"
                value={formData.reviewTime}
                onChange={handleChange}
                placeholder="2 weeks ago"
                className="w-full border rounded-lg px-3 py-2 text-sm"
              />
              <p className="text-xs text-gray-400 mt-1">
                Examples: 2 weeks ago, 1 month ago, 1 year ago
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs mb-1">Rating</label>
                <select
                  name="rating"
                  value={formData.rating}
                  onChange={handleChange}
                  className="w-full border rounded-lg px-3 py-2 text-sm"
                >
                  <option value={5}>5 Stars</option>
                  <option value={4}>4 Stars</option>
                  <option value={3}>3 Stars</option>
                  <option value={2}>2 Stars</option>
                  <option value={1}>1 Star</option>
                </select>
              </div>

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
        </section>

        <div className="flex justify-end gap-4">
          <button
            type="button"
            onClick={() => router.push("/admin/testimonials")}
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
              : "Create Testimonial"}
          </button>
        </div>
      </form>
    </div>
  );
}
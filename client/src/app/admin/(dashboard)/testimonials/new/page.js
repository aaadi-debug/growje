"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ChevronLeft } from "lucide-react";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export default function CreateTestimonialPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    role: "",
    content: "",
    rating: 5,
    order: 0,
    status: "draft",
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
      const res = await fetch(`${API_URL}/testimonials`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(formData),
      });
      const data = await res.json();

      if (!res.ok) {
        alert(data.message || "Failed to create");
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
          <h1 className="text-2xl font-bold">Add Testimonial</h1>
          <p className="text-gray-500 text-sm">Create a new client review</p>
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
                placeholder="Aarav Mehta"
                className="w-full border rounded-lg px-3 py-2 text-sm"
              />
            </div>

            <div>
              <label className="block text-xs mb-1">Role / Company</label>
              <input
                type="text"
                name="role"
                value={formData.role}
                onChange={handleChange}
                placeholder="Founder, Nexa Labs"
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
            {loading ? "Creating..." : "Create Testimonial"}
          </button>
        </div>
      </form>
    </div>
  );
}
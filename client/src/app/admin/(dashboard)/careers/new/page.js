"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ChevronLeft } from "lucide-react";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export default function CreateJobPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [responsibility, setResponsibility] = useState("");
  const [requirement, setRequirement] = useState("");

  const [formData, setFormData] = useState({
    title: "",
    slug: "",
    department: "",
    location: "Remote",
    employmentType: "full-time",
    shortDescription: "",
    description: "",
    responsibilities: [],
    requirements: [],
    applyEmail: "careers@growje.com",
    status: "draft",
    order: 0,
    seo: { metaTitle: "", metaDescription: "" },
  });

  const generateSlug = (value) =>
    value
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9\s-]/g, "")
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-");

  const handleTitleChange = (e) => {
    const value = e.target.value;
    setFormData((prev) => ({
      ...prev,
      title: value,
      slug: generateSlug(value),
    }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSeoChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      seo: { ...prev.seo, [name]: value },
    }));
  };

  const addItem = (field, value, clearFn) => {
    const trimmed = value.trim();
    if (!trimmed) return;
    setFormData((prev) => ({
      ...prev,
      [field]: [...prev[field], trimmed],
    }));
    clearFn("");
  };

  const removeItem = (field, index) => {
    setFormData((prev) => ({
      ...prev,
      [field]: prev[field].filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.title.trim() || !formData.slug.trim()) {
      alert("Title and slug are required");
      return;
    }

    try {
      setLoading(true);
      const res = await fetch(`${API_URL}/jobs`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
          ...formData,
          order: Number(formData.order),
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        alert(data.message || "Failed to create");
        return;
      }
      router.push("/admin/careers");
      router.refresh();
    } catch (err) {
      alert("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto relative p-8">
      <div className="mb-8 flex items-start gap-4">
        <button
          type="button"
          onClick={() => router.push("/admin/careers")}
          className="bg-black text-white p-2 rounded-full hover:bg-zinc-700"
        >
          <ChevronLeft size={16} />
        </button>
        <div>
          <h1 className="text-2xl font-bold">Create Job</h1>
          <p className="text-gray-500 text-sm">Add a new job opening</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* BASIC */}
        <section className="rounded-xl bg-white border border-gray-200 pb-4">
          <h2 className="font-medium mb-2 bg-primary px-4 py-2 rounded-t-xl text-white">
            Basic Information
          </h2>
          <div className="grid md:grid-cols-2 gap-5 px-4">
            <div>
              <label className="block text-xs mb-1">Job Title</label>
              <input
                type="text"
                value={formData.title}
                onChange={handleTitleChange}
                placeholder="Senior Frontend Developer"
                className="w-full border rounded-lg px-3 py-2 text-sm"
              />
            </div>
            <div>
              <label className="block text-xs mb-1">Slug</label>
              <input
                type="text"
                name="slug"
                value={formData.slug}
                onChange={handleChange}
                className="w-full border rounded-lg px-3 py-2 text-sm"
              />
            </div>
            <div>
              <label className="block text-xs mb-1">Department</label>
              <input
                type="text"
                name="department"
                value={formData.department}
                onChange={handleChange}
                placeholder="Engineering"
                className="w-full border rounded-lg px-3 py-2 text-sm"
              />
            </div>
            <div>
              <label className="block text-xs mb-1">Location</label>
              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleChange}
                className="w-full border rounded-lg px-3 py-2 text-sm"
              />
            </div>
            <div>
              <label className="block text-xs mb-1">Employment Type</label>
              <select
                name="employmentType"
                value={formData.employmentType}
                onChange={handleChange}
                className="w-full border rounded-lg px-3 py-2 text-sm"
              >
                <option value="full-time">Full-time</option>
                <option value="part-time">Part-time</option>
                <option value="contract">Contract</option>
                <option value="internship">Internship</option>
              </select>
            </div>
            <div>
              <label className="block text-xs mb-1">Apply Email</label>
              <input
                type="email"
                name="applyEmail"
                value={formData.applyEmail}
                onChange={handleChange}
                className="w-full border rounded-lg px-3 py-2 text-sm"
              />
            </div>
          </div>
          <div className="mt-5 px-4">
            <label className="block text-xs mb-1">Short Description</label>
            <textarea
              name="shortDescription"
              value={formData.shortDescription}
              onChange={handleChange}
              rows={2}
              className="w-full border rounded-lg px-3 py-2 text-sm"
            />
          </div>
          <div className="mt-5 px-4">
            <label className="block text-xs mb-1">Full Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows={5}
              className="w-full border rounded-lg px-3 py-2 text-sm"
            />
          </div>
        </section>

        {/* RESPONSIBILITIES */}
        <section className="rounded-xl bg-white border border-gray-200 pb-4">
          <h2 className="font-medium mb-2 bg-primary px-4 py-2 rounded-t-xl text-white">
            Responsibilities
          </h2>
          <div className="flex gap-3 px-4">
            <input
              type="text"
              value={responsibility}
              onChange={(e) => setResponsibility(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  addItem("responsibilities", responsibility, setResponsibility);
                }
              }}
              placeholder="Add responsibility"
              className="flex-1 border rounded-lg px-3 py-2 text-sm"
            />
            <button
              type="button"
              onClick={() =>
                addItem("responsibilities", responsibility, setResponsibility)
              }
              className="bg-black text-white px-4 py-2 rounded-lg text-sm"
            >
              Add
            </button>
          </div>
          <div className="flex flex-wrap gap-2 mt-4 px-4">
            {formData.responsibilities.map((item, i) => (
              <span
                key={i}
                className="flex items-center gap-2 bg-gray-100 px-3 py-1.5 rounded-full text-sm"
              >
                {item}
                <button
                  type="button"
                  onClick={() => removeItem("responsibilities", i)}
                  className="text-red-500"
                >
                  ×
                </button>
              </span>
            ))}
          </div>
        </section>

        {/* REQUIREMENTS */}
        <section className="rounded-xl bg-white border border-gray-200 pb-4">
          <h2 className="font-medium mb-2 bg-primary px-4 py-2 rounded-t-xl text-white">
            Requirements
          </h2>
          <div className="flex gap-3 px-4">
            <input
              type="text"
              value={requirement}
              onChange={(e) => setRequirement(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  addItem("requirements", requirement, setRequirement);
                }
              }}
              placeholder="Add requirement"
              className="flex-1 border rounded-lg px-3 py-2 text-sm"
            />
            <button
              type="button"
              onClick={() => addItem("requirements", requirement, setRequirement)}
              className="bg-black text-white px-4 py-2 rounded-lg text-sm"
            >
              Add
            </button>
          </div>
          <div className="flex flex-wrap gap-2 mt-4 px-4">
            {formData.requirements.map((item, i) => (
              <span
                key={i}
                className="flex items-center gap-2 bg-gray-100 px-3 py-1.5 rounded-full text-sm"
              >
                {item}
                <button
                  type="button"
                  onClick={() => removeItem("requirements", i)}
                  className="text-red-500"
                >
                  ×
                </button>
              </span>
            ))}
          </div>
        </section>

        {/* SETTINGS + SEO */}
        <section className="rounded-xl bg-white border border-gray-200 pb-4">
          <h2 className="font-medium mb-2 bg-primary px-4 py-2 rounded-t-xl text-white">
            Publishing
          </h2>
          <div className="grid md:grid-cols-2 gap-5 px-4">
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
        </section>

        <section className="rounded-xl bg-white border border-gray-200 pb-4">
          <h2 className="font-medium mb-2 bg-primary px-4 py-2 rounded-t-xl text-white">
            SEO
          </h2>
          <div className="space-y-4 px-4">
            <div>
              <label className="block text-xs mb-1">Meta Title</label>
              <input
                type="text"
                name="metaTitle"
                value={formData.seo.metaTitle}
                onChange={handleSeoChange}
                className="w-full border rounded-lg px-3 py-2 text-sm"
              />
            </div>
            <div>
              <label className="block text-xs mb-1">Meta Description</label>
              <textarea
                name="metaDescription"
                value={formData.seo.metaDescription}
                onChange={handleSeoChange}
                rows={3}
                className="w-full border rounded-lg px-3 py-2 text-sm"
              />
            </div>
          </div>
        </section>

        <div className="flex justify-end gap-4">
          <button
            type="button"
            onClick={() => router.push("/admin/careers")}
            className="border px-4 py-2 rounded-lg text-sm"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={loading}
            className="bg-black text-white px-5 py-3 rounded-lg disabled:opacity-50"
          >
            {loading ? "Creating..." : "Create Job"}
          </button>
        </div>
      </form>
    </div>
  );
}
// client/src/app/admin/(dashboard)/services/new/page.js
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, ChevronLeft } from "lucide-react"
import MediaUpload from "../../../../../components/admin/MediaUpload";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export default function CreateServicePage() {
  const router = useRouter();

  const [loading, setLoading] = useState(false);

  const [clientName, setClientName] = useState("");

  const [formData, setFormData] = useState({
    title: "",
    slug: "",
    shortDescription: "",

    // hero: {
    //   title: "",
    //   mediaType: "image",
    //   media: "",
    // },

    hero: {
      title: "",
      mediaType: "image",
      media: {
        type: "image",
        url: "",
        publicId: "",
        alt: "",
      },
    },

    clients: [],
    portfolioTitle: "PORTFOLIO",
    portfolioSubtitle: "",
    status: "draft",
    order: 0,
    seo: {
      metaTitle: "",
      metaDescription: "",
    },
  });

  const generateSlug = (value) => {
    return value
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9\s-]/g, "")
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-");
  };

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

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleHeroChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      hero: {
        ...prev.hero,
        [name]: value,
      },
    }));
  };

  const handleSeoChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      seo: {
        ...prev.seo,
        [name]: value,
      },
    }));
  };

  const addClient = () => {
    const trimmedName = clientName.trim();

    if (!trimmedName) return;

    setFormData((prev) => ({
      ...prev,
      clients: [
        ...prev.clients,
        {
          name: trimmedName,
        },
      ],
    }));

    setClientName("");
  };

  const removeClient = (index) => {
    setFormData((prev) => ({
      ...prev,
      clients: prev.clients.filter(
        (_, i) => i !== index
      ),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.title.trim()) {
      alert("Service title is required");
      return;
    }

    if (!formData.slug.trim()) {
      alert("Service slug is required");
      return;
    }

    try {
      setLoading(true);

      const response = await fetch(
        `${API_URL}/services`,
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
          },

          credentials: "include",

          body: JSON.stringify({
            ...formData,
            order: Number(formData.order),
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        alert(
          data.message || "Failed to create service"
        );
        return;
      }

      router.push("/admin/services");
      router.refresh();
    } catch (error) {
      console.error("Create Service Error:", error);
      alert("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto relative p-8">
      <div className="mb-8 flex items-start justify-start gap-4">
        <button
          type="button"
          onClick={() => router.push("/admin/services")}
          title="Back to Services"
          className="bg-black text-white p-2 rounded-full hover:bg-zinc-700 transition duration-300 cursor-pointer"
        >
          {/* <ArrowLeft size={16} /> */}
          <ChevronLeft size={16} />
        </button>

        <div>
          <h1 className="text-2xl font-bold">Create Service</h1>
          <p className="text-gray-500 text-sm">Create a new service and configure its page.</p>
        </div>
      </div>

      <form
        onSubmit={handleSubmit}
        className="space-y-8"
      >
        {/* BASIC INFORMATION */}
        <section className="rounded-xl p-6 bg-white shadow border border-gray-200">
          <h2 className="text-xl font-semibold mb-6">
            Basic Information
          </h2>

          <div className="grid md:grid-cols-2 gap-5">
            <div>
              <label className="block mb-2">
                Service Title
              </label>

              <input
                type="text"
                value={formData.title}
                onChange={handleTitleChange}
                placeholder="Website UI/UX"
                className="w-full border rounded-lg px-4 py-3"
              />
            </div>

            <div>
              <label className="block mb-2">
                Slug
              </label>

              <input
                type="text"
                name="slug"
                value={formData.slug}
                onChange={handleChange}
                placeholder="website-ui-ux"
                className="w-full border rounded-lg px-4 py-3"
              />
            </div>
          </div>

          <div className="mt-5">
            <label className="block mb-2">
              Short Description
            </label>

            <textarea
              name="shortDescription"
              value={formData.shortDescription}
              onChange={handleChange}
              rows={4}
              className="w-full border rounded-lg px-4 py-3"
            />
          </div>
        </section>

        {/* HERO */}
        <section className="rounded-xl p-6 bg-white shadow border border-gray-200">
          <h2 className="text-xl font-semibold mb-6">Hero Section</h2>

          <div className="mb-5">
            <label className="block mb-2">Hero Title</label>
            <input
              type="text"
              name="title"
              value={formData.hero.title}
              onChange={handleHeroChange}
              className="w-full border rounded-lg px-4 py-3"
            />
          </div>

          <div className="mb-5">
            <label className="block mb-2">Media Type</label>
            <select
              name="mediaType"
              value={formData.hero.mediaType}
              onChange={handleHeroChange}
              className="w-full md:w-1/2 border rounded-lg px-4 py-3"
            >
              <option value="image">Image</option>
              <option value="gif">GIF</option>
              <option value="video">Video</option>
            </select>
          </div>

          <MediaUpload
            label="Hero Media"
            value={formData.hero.media}
            onChange={(media) =>
              setFormData((prev) => ({
                ...prev,
                hero: {
                  ...prev.hero,
                  mediaType: media.type || prev.hero.mediaType,
                  media: {
                    ...prev.hero.media,
                    ...media,
                  },
                },
              }))
            }
          />
        </section>

        {/* CLIENTS */}
        <section className="rounded-xl p-6 bg-white shadow border border-gray-200">
          <h2 className="text-xl font-semibold mb-2">
            Client Marquee
          </h2>

          <p className="text-gray-500 mb-5">
            Add client names that will scroll
            horizontally on the service page.
          </p>

          <div className="flex gap-3">
            <input
              type="text"
              value={clientName}
              onChange={(e) =>
                setClientName(e.target.value)
              }
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  addClient();
                }
              }}
              placeholder="Enter client name"
              className="flex-1 border rounded-lg px-4 py-3"
            />

            <button
              type="button"
              onClick={addClient}
              className="bg-black text-white px-5 rounded-lg"
            >
              Add
            </button>
          </div>

          {formData.clients.length > 0 && (
            <div className="flex flex-wrap gap-3 mt-5">
              {formData.clients.map(
                (client, index) => (
                  <div
                    key={`${client.name}-${index}`}
                    className="flex items-center gap-2 bg-gray-100 px-4 py-2 rounded-full"
                  >
                    <span>{client.name}</span>

                    <button
                      type="button"
                      onClick={() =>
                        removeClient(index)
                      }
                      className="text-red-500"
                    >
                      ×
                    </button>
                  </div>
                )
              )}
            </div>
          )}
        </section>

        {/* PORTFOLIO */}
        <section className="rounded-xl p-6 bg-white shadow border border-gray-200">
          <h2 className="text-xl font-semibold mb-6">
            Portfolio Section
          </h2>

          <div className="grid md:grid-cols-2 gap-5">
            <div>
              <label className="block mb-2">
                Portfolio Title
              </label>

              <input
                type="text"
                name="portfolioTitle"
                value={formData.portfolioTitle}
                onChange={handleChange}
                className="w-full border rounded-lg px-4 py-3"
              />
            </div>

            <div>
              <label className="block mb-2">
                Portfolio Subtitle
              </label>

              <input
                type="text"
                name="portfolioSubtitle"
                value={formData.portfolioSubtitle}
                onChange={handleChange}
                className="w-full border rounded-lg px-4 py-3"
              />
            </div>
          </div>
        </section>

        {/* SETTINGS */}
        <section className="rounded-xl p-6 bg-white shadow border border-gray-200">
          <h2 className="text-xl font-semibold mb-6">
            Publishing Settings
          </h2>

          <div className="grid md:grid-cols-2 gap-5">
            <div>
              <label className="block mb-2">
                Status
              </label>

              <select
                name="status"
                value={formData.status}
                onChange={handleChange}
                className="w-full border rounded-lg px-4 py-3"
              >
                <option value="draft">
                  Draft
                </option>

                <option value="published">
                  Published
                </option>
              </select>
            </div>

            <div>
              <label className="block mb-2">
                Display Order
              </label>

              <input
                type="number"
                name="order"
                value={formData.order}
                onChange={handleChange}
                className="w-full border rounded-lg px-4 py-3"
              />
            </div>
          </div>
        </section>

        {/* SEO */}
        <section className="rounded-xl p-6 bg-white shadow border border-gray-200">
          <h2 className="text-xl font-semibold mb-6">
            SEO
          </h2>

          <div className="space-y-5">
            <div>
              <label className="block mb-2">
                Meta Title
              </label>

              <input
                type="text"
                name="metaTitle"
                value={formData.seo.metaTitle}
                onChange={handleSeoChange}
                className="w-full border rounded-lg px-4 py-3"
              />
            </div>

            <div>
              <label className="block mb-2">
                Meta Description
              </label>

              <textarea
                name="metaDescription"
                value={
                  formData.seo.metaDescription
                }
                onChange={handleSeoChange}
                rows={4}
                className="w-full border rounded-lg px-4 py-3"
              />
            </div>
          </div>
        </section>

        {/* SUBMIT */}
        <div className="flex justify-end gap-4">
          <button
            type="button"
            onClick={() =>
              router.push("/admin/services")
            }
            className="rounded-lg border px-4 py-2 text-sm font-medium transition hover:bg-black hover:text-white disabled:opacity-50 cursor-pointer"
          >
            Cancel
          </button>

          <button
            type="submit"
            disabled={loading}
            className="bg-black text-white px-5 py-3 rounded-lg hover:bg-zinc-700 transition duration-300 cursor-pointer disabled:opacity-50"
          >
            {loading
              ? "Creating..."
              : "Create Service"}
          </button>
        </div>
      </form>
    </div>
  );
}
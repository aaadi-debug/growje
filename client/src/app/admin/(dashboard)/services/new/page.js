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
    category: "online",
    shortDescription: "",
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
    servicesSection: {
      title: "",
      items: [],
    },
    processSection: {
      title: "",
      steps: [],
    },
    aboutSections: [],
    faqs: [],
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
        <section className="rounded-xl bg-white border border-gray-200 pb-4">
          <h2 className="font-medium mb-2 bg-primary px-4 py-2 rounded-t-xl text-white">
            Basic Information
          </h2>

          {/* row 1 */}
          <div className="grid md:grid-cols-2 gap-5 px-4">
            <div>
              <label className="block leading-5 text-xs">
                Service Title
              </label>

              <input
                type="text"
                value={formData.title}
                onChange={handleTitleChange}
                placeholder="Website UI/UX"
                className="w-full border rounded-lg px-3 py-2 text-sm"
              />
            </div>

            <div>
              <label className="block leading-5 text-xs">
                Slug
              </label>

              <input
                type="text"
                name="slug"
                value={formData.slug}
                onChange={handleChange}
                placeholder="website-ui-ux"
                className="w-full border rounded-lg px-3 py-2 text-sm"
              />
            </div>
          </div>

          {/* row 2 */}
          <div className="mt-5 px-4">
            <label className="block leading-5 text-xs">
              Short Description
            </label>

            <textarea
              name="shortDescription"
              value={formData.shortDescription}
              onChange={handleChange}
              rows={4}
              className="w-full border rounded-lg px-3 py-2 text-sm"
            />
          </div>

          {/* ✅ rpw 3 */}
          <div className="mt-2 px-4">
            <label className="block leading-5 text-xs">Category</label>
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="w-full border rounded-lg px-3 py-2 text-sm"
            >
              <option value="online">Online Marketing</option>
              <option value="offline">Offline Marketing</option>
            </select>
          </div>
        </section>

        {/* HERO */}
        <section className="rounded-xl bg-white border border-gray-200">
          <h2 className="font-medium mb-2 bg-primary px-4 py-2 rounded-t-xl text-white">Hero Section</h2>

          <div className="grid grid-cols-2 gap-6 px-4">
            {/* left side */}
            <div>
              <div className="mb-5">
                <label className="block leading-5 text-xs">Hero Title</label>
                <input
                  type="text"
                  name="title"
                  value={formData.hero.title}
                  onChange={handleHeroChange}
                  className="w-full border rounded-lg px-3 py-2 text-sm"
                />
              </div>

              <div className="mb-5">
                <label className="block leading-5 text-xs">Media Type</label>
                <select
                  name="mediaType"
                  value={formData.hero.mediaType}
                  onChange={handleHeroChange}
                  className="w-full border rounded-lg px-3 py-2 text-sm"
                >
                  <option value="image">Image</option>
                  <option value="gif">GIF</option>
                  <option value="video">Video</option>
                </select>
              </div>
            </div>

            {/* right side */}
            <div className="max-w-76">
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
            </div>
          </div>
        </section>

        {/* CLIENTS */}
        <section className="rounded-xl bg-white border border-gray-200 pb-4">
          <h2 className="font-medium mb-2 bg-primary px-4 py-2 rounded-t-xl text-white">
            Client Marquee
          </h2>

          <p className="text-gray-500 mb-3 px-4 text-sm">
            Add client names that will scroll
            horizontally on the service page.
          </p>

          <div className="flex gap-3 px-4">
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
              className="flex-1 border rounded-lg px-3 py-2 text-sm"
            />

            <button
              type="button"
              onClick={addClient}
              className="bg-black text-sm text-white px-4 py-2 rounded-lg hover:bg-zinc-700 transition duration-300 cursor-pointer"
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
        <section className="rounded-xl bg-white border border-gray-200 pb-4">
          <h2 className="font-medium mb-2 bg-primary px-4 py-2 rounded-t-xl text-white">
            Portfolio Section
          </h2>

          <div className="grid md:grid-cols-2 gap-5 px-4">
            <div>
              <label className="block leading-5 text-xs">
                Portfolio Title
              </label>

              <input
                type="text"
                name="portfolioTitle"
                value={formData.portfolioTitle}
                onChange={handleChange}
                className="w-full border rounded-lg px-3 py-2 text-sm"
              />
            </div>

            <div>
              <label className="block leading-5 text-xs">
                Portfolio Subtitle
              </label>

              <input
                type="text"
                name="portfolioSubtitle"
                value={formData.portfolioSubtitle}
                onChange={handleChange}
                className="w-full border rounded-lg px-3 py-2 text-sm"
              />
            </div>
          </div>
        </section>

        {/* ====================== SERVICES SECTION ====================== */}
        <section className="rounded-xl bg-white border border-gray-200 pb-4">
          <h2 className="font-medium mb-2 bg-primary px-4 py-2 rounded-t-xl text-white">Services Section</h2>
          <p className="text-xs text-gray-500 mb-2 px-4 text-red-500">
            * Only one section allowed. Add as many service cards as you want.
          </p>

          <div className="mb-5 px-4">
            <label className="block mb-2 text-sm font-medium">Section Title</label>
            <input
              type="text"
              value={formData.servicesSection?.title || ""}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  servicesSection: {
                    ...prev.servicesSection,
                    title: e.target.value,
                    items: prev.servicesSection?.items || [],
                  },
                }))
              }
              placeholder="Our Digital Marketing Services in India"
              className="w-full border rounded-lg px-3 py-2 text-sm"
            />
          </div>

          <div className="space-y-4 px-4">
            {(formData.servicesSection?.items || []).map((item, index) => (
              <div key={index} className="border rounded-lg p-4 relative bg-gray-50">
                <button
                  type="button"
                  onClick={() => {
                    const items = [...(formData.servicesSection?.items || [])];
                    items.splice(index, 1);
                    setFormData((prev) => ({
                      ...prev,
                      servicesSection: { ...prev.servicesSection, items },
                    }));
                  }}
                  className="absolute -top-1 right-1 text-red-500 cursor-pointer"
                >
                  ×
                </button>

                <input
                  type="text"
                  value={item.title}
                  onChange={(e) => {
                    const items = [...(formData.servicesSection?.items || [])];
                    items[index].title = e.target.value;
                    setFormData((prev) => ({
                      ...prev,
                      servicesSection: { ...prev.servicesSection, items },
                    }));
                  }}
                  placeholder="Service Title (e.g. SEO Services)"
                  className="w-full border rounded-lg px-3 py-2 mb-3"
                />

                <textarea
                  value={item.description}
                  onChange={(e) => {
                    const items = [...(formData.servicesSection?.items || [])];
                    items[index].description = e.target.value;
                    setFormData((prev) => ({
                      ...prev,
                      servicesSection: { ...prev.servicesSection, items },
                    }));
                  }}
                  rows={3}
                  placeholder="Short description..."
                  className="w-full border rounded-lg px-3 py-2"
                />
              </div>
            ))}
          </div>

          <button
            type="button"
            onClick={() => {
              setFormData((prev) => ({
                ...prev,
                servicesSection: {
                  title: prev.servicesSection?.title || "",
                  items: [
                    ...(prev.servicesSection?.items || []),
                    { title: "", description: "" },
                  ],
                },
              }));
            }}
            className="mt-4 text-sm bg-black text-white px-4 py-2 rounded-lg ml-4 hover:bg-black/80 cursor-pointer"
          >
            + Add Service Card
          </button>
        </section>

        {/* ====================== PROCESS SECTION ====================== */}
        <section className="rounded-xl bg-white border border-gray-200 pb-4">
          <h2 className="font-medium mb-2 bg-primary px-4 py-2 rounded-t-xl text-white">Process Section</h2>
          <p className="text-xs text-gray-500 mb-2 px-4 text-red-500">
            * Show the step-by-step process of this service.
          </p>

          <div className="mb-5 px-4">
            <label className="block mb-2 text-sm font-medium">Process Title</label>
            <input
              type="text"
              value={formData.processSection?.title || ""}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  processSection: {
                    ...prev.processSection,
                    title: e.target.value,
                    steps: prev.processSection?.steps || [],
                  },
                }))
              }
              placeholder="Our SEO Process"
              className="w-full border rounded-lg px-3 py-2 text-sm"
            />
          </div>

          <div className="space-y-4 px-4">
            {(formData.processSection?.steps || []).map((step, index) => (
              <div key={index} className="border rounded-lg p-4 relative bg-gray-50">
                <button
                  type="button"
                  onClick={() => {
                    const steps = [...(formData.processSection?.steps || [])];
                    steps.splice(index, 1);
                    setFormData((prev) => ({
                      ...prev,
                      processSection: { ...prev.processSection, steps },
                    }));
                  }}
                  className="absolute -top-1 right-1 text-red-500"
                >
                  ×
                </button>

                <input
                  type="text"
                  value={step.title}
                  onChange={(e) => {
                    const steps = [...(formData.processSection?.steps || [])];
                    steps[index].title = e.target.value;
                    setFormData((prev) => ({
                      ...prev,
                      processSection: { ...prev.processSection, steps },
                    }));
                  }}
                  placeholder="1. Audit"
                  className="w-full border rounded-lg px-3 py-2 mb-3"
                />

                <textarea
                  value={step.description}
                  onChange={(e) => {
                    const steps = [...(formData.processSection?.steps || [])];
                    steps[index].description = e.target.value;
                    setFormData((prev) => ({
                      ...prev,
                      processSection: { ...prev.processSection, steps },
                    }));
                  }}
                  rows={2}
                  placeholder="Website & competitor analysis."
                  className="w-full border rounded-lg px-3 py-2"
                />
              </div>
            ))}
          </div>

          <button
            type="button"
            onClick={() => {
              setFormData((prev) => ({
                ...prev,
                processSection: {
                  title: prev.processSection?.title || "",
                  steps: [
                    ...(prev.processSection?.steps || []),
                    { title: "", description: "" },
                  ],
                },
              }));
            }}
            className="mt-4 text-sm bg-black text-white px-4 py-2 rounded-lg ml-4 cursor-pointer hover:bg-black/80"
          >
            + Add Step
          </button>
        </section>

        {/* ====================== ABOUT SECTIONS ====================== */}
        <section className="rounded-xl bg-white border border-gray-200 pb-4">
          <h2 className="font-medium mb-2 bg-primary px-4 py-2 rounded-t-xl text-white">About Sections</h2>
          <p className="text-xs text-gray-500 mb-2 px-4 text-red-500">
            * Layout alternates automatically (Content-Image / Image-Content)
          </p>

          <div className="px-4">
            {(formData.aboutSections || []).map((section, sectionIndex) => (
              <div
                key={sectionIndex}
                className="border rounded-xl p-5 mb-6 bg-gray-50 relative"
              >
                <button
                  type="button"
                  onClick={() => {
                    setFormData((prev) => ({
                      ...prev,
                      aboutSections: prev.aboutSections.filter(
                        (_, i) => i !== sectionIndex
                      ),
                    }));
                  }}
                  className="absolute top-4 right-4 text-red-500"
                >
                  Remove
                </button>

                <p className="text-xs text-gray-400 mb-4">
                  Section {sectionIndex + 1} →{" "}
                  {sectionIndex % 2 === 0
                    ? "Content Left + Image Right"
                    : "Image Left + Content Right"}
                </p>

                <div className="mb-4">
                  <label className="block mb-1 text-sm">Title</label>
                  <input
                    type="text"
                    value={section.title}
                    onChange={(e) => {
                      const updated = [...formData.aboutSections];
                      updated[sectionIndex].title = e.target.value;
                      setFormData((prev) => ({ ...prev, aboutSections: updated }));
                    }}
                    className="w-full border rounded-lg px-3 py-2"
                    placeholder="What is Search Engine Optimization (SEO)?"
                  />
                </div>

                <div className="mb-4">
                  <label className="block mb-1 text-sm">Description</label>
                  <textarea
                    value={section.description}
                    onChange={(e) => {
                      const updated = [...formData.aboutSections];
                      updated[sectionIndex].description = e.target.value;
                      setFormData((prev) => ({ ...prev, aboutSections: updated }));
                    }}
                    rows={4}
                    className="w-full border rounded-lg px-3 py-2"
                  />
                </div>

                <div className="grid gap-6 grid-cols-2">
                  {/* Bullets */}
                  <div className="mb-4">
                    <label className="block mb-2 text-sm">Bullet Points</label>
                    {(section.bullets || []).map((bullet, bIndex) => (
                      <div key={bIndex} className="flex gap-2 mb-2">
                        <input
                          type="text"
                          value={bullet}
                          onChange={(e) => {
                            const updated = [...formData.aboutSections];
                            updated[sectionIndex].bullets[bIndex] = e.target.value;
                            setFormData((prev) => ({ ...prev, aboutSections: updated }));
                          }}
                          className="flex-1 border rounded-lg px-3 py-2"
                          placeholder="Higher Google rankings & visibility"
                        />
                        <button
                          type="button"
                          onClick={() => {
                            const updated = [...formData.aboutSections];
                            updated[sectionIndex].bullets = updated[
                              sectionIndex
                            ].bullets.filter((_, i) => i !== bIndex);
                            setFormData((prev) => ({ ...prev, aboutSections: updated }));
                          }}
                          className="text-red-500 px-2"
                        >
                          ×
                        </button>
                      </div>
                    ))}
                    <button
                      type="button"
                      onClick={() => {
                        const updated = [...formData.aboutSections];
                        updated[sectionIndex].bullets.push("");
                        setFormData((prev) => ({ ...prev, aboutSections: updated }));
                      }}
                      className="text-sm text-blue-600"
                    >
                      + Add Bullet
                    </button>
                  </div>

                  {/* Image */}
                  <div className="w-[60%]">
                    <label className="block mb-2 text-sm hidden">Image</label>
                    <MediaUpload
                      label="About Section Image"
                      value={section.image}
                      onChange={(media) => {
                        const updated = [...formData.aboutSections];
                        updated[sectionIndex].image = media;
                        setFormData((prev) => ({ ...prev, aboutSections: updated }));
                      }}
                    />
                  </div>
                </div>
              </div>
            ))}

            <button
              type="button"
              onClick={() => {
                setFormData((prev) => ({
                  ...prev,
                  aboutSections: [
                    ...(prev.aboutSections || []),
                    {
                      title: "",
                      description: "",
                      bullets: [""],
                      image: { url: "", alt: "", publicId: "" },
                    },
                  ],
                }));
              }}
              className="text-sm bg-black text-white px-4 py-2 rounded-lg hover:bg-black/80 cursor-pointer"
            >
              + Add About Section
            </button>
          </div>

        </section>

        {/* ====================== FAQs ====================== */}
        <section className="rounded-xl bg-white border border-gray-200 pb-4">
          <h2 className="font-medium mb-2 bg-primary px-4 py-2 rounded-t-xl text-white mb-4">FAQs</h2>

          <div className="px-4 grid grid-cols-2 gap-4">
            {(formData.faqs || []).map((faq, index) => (
              <div key={index} className="border rounded-lg p-4 mb-4 relative">
                <button
                  type="button"
                  onClick={() => {
                    setFormData((prev) => ({
                      ...prev,
                      faqs: prev.faqs.filter((_, i) => i !== index),
                    }));
                  }}
                  className="absolute top-3 right-3 text-red-500"
                >
                  ×
                </button>

                <div className="mb-3">
                  <label className="block mb-1 text-sm">Question</label>
                  <input
                    type="text"
                    value={faq.question}
                    onChange={(e) => {
                      const updated = [...formData.faqs];
                      updated[index].question = e.target.value;
                      setFormData((prev) => ({ ...prev, faqs: updated }));
                    }}
                    className="w-full border rounded-lg px-3 py-2"
                    placeholder="What is included in this service?"
                  />
                </div>

                <div>
                  <label className="block mb-1 text-sm">Answer</label>
                  <textarea
                    value={faq.answer}
                    onChange={(e) => {
                      const updated = [...formData.faqs];
                      updated[index].answer = e.target.value;
                      setFormData((prev) => ({ ...prev, faqs: updated }));
                    }}
                    rows={3}
                    className="w-full border rounded-lg px-3 py-2"
                    placeholder="Detailed answer..."
                  />
                </div>
              </div>
            ))}
          </div>

          <button
            type="button"
            onClick={() => {
              setFormData((prev) => ({
                ...prev,
                faqs: [...(prev.faqs || []), { question: "", answer: "" }],
              }));
            }}
            className="bg-black text-white px-4 py-2 rounded-lg text-sm ml-4 cursor-pointer hover:bg-black/80"
          >
            + Add FAQ
          </button>
        </section>

        {/* SETTINGS */}
        <section className="rounded-xl bg-white border border-gray-200 pb-4">
          <h2 className="font-medium mb-2 bg-primary px-4 py-2 rounded-t-xl text-white">
            Publishing Settings
          </h2>

          <div className="grid md:grid-cols-2 gap-5 px-4">
            <div>
              <label className="block leading-5 text-xs">
                Status
              </label>

              <select
                name="status"
                value={formData.status}
                onChange={handleChange}
                className="w-full border rounded-lg px-3 py-2 text-sm"
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
              <label className="block leading-5 text-xs">
                Display Order
              </label>

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

        {/* SEO */}
        <section className="rounded-xl bg-white border border-gray-200 pb-4">
          <h2 className="font-medium mb-2 bg-primary px-4 py-2 rounded-t-xl text-white">
            SEO
          </h2>

          <div className="space-y-5 px-4">
            <div>
              <label className="block leading-5 text-xs">
                Meta Title
              </label>

              <input
                type="text"
                name="metaTitle"
                value={formData.seo.metaTitle}
                onChange={handleSeoChange}
                className="w-full border rounded-lg px-3 py-2 text-sm"
              />
            </div>

            <div>
              <label className="block leading-5 text-xs">
                Meta Description
              </label>

              <textarea
                name="metaDescription"
                value={
                  formData.seo.metaDescription
                }
                onChange={handleSeoChange}
                rows={4}
                className="w-full border rounded-lg px-3 py-2 text-sm"
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
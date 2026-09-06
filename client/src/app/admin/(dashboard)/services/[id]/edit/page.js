// client/src/app/admin/(dashborad)/services/[id]/edit/page.js
"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { ArrowLeft, ChevronLeft } from "lucide-react"
import MediaUpload from "../../../../../../components/admin/MediaUpload";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export default function EditServicePage() {
  const params = useParams();
  const router = useRouter();

  const { id } = params;

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [clientName, setClientName] = useState("");

  const [formData, setFormData] = useState(null);

  useEffect(() => {
    const fetchService = async () => {
      try {
        const response = await fetch(
          `${API_URL}/services/${id}`,
          {
            credentials: "include",
          }
        );

        const data = await response.json();

        if (!response.ok) {
          alert(data.message || "Failed to fetch service");
          router.push("/admin/services");
          return;
        }

        const service = data.service;

        const rawMedia = service.hero?.media;

        const normalizedMedia =
          typeof rawMedia === "string"
            ? {
              type: service.hero?.mediaType || "image",
              url: rawMedia || "",
              publicId: "",
              alt: "",
            }
            : {
              type: rawMedia?.type || service.hero?.mediaType || "image",
              url: rawMedia?.url || "",
              publicId: rawMedia?.publicId || "",
              alt: rawMedia?.alt || "",
            };

        setFormData({
          ...service,
          clients: service.clients || [],
          servicesSection: service.servicesSection || { title: "", items: [] },
          processSection: service.processSection || { title: "", steps: [] },
          aboutSections: service.aboutSections || [],
          faqs: service.faqs || [],
          hero: {
            title: service.hero?.title || "",
            mediaType: service.hero?.mediaType || normalizedMedia.type || "image",
            media: normalizedMedia,
          },
          seo: {
            metaTitle: service.seo?.metaTitle || "",
            metaDescription: service.seo?.metaDescription || "",
          },
        });
      } catch (error) {
        console.error(error);
        router.push("/admin/services");
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchService();
    }
  }, [id, router]);

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
    const name = clientName.trim();

    if (!name) return;

    setFormData((prev) => ({
      ...prev,
      clients: [
        ...prev.clients,
        { name },
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

    try {
      setSaving(true);

      const response = await fetch(
        `${API_URL}/services/${id}`,
        {
          method: "PUT",

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
        alert(data.message || "Failed to update");
        return;
      }

      router.push("/admin/services");
      router.refresh();
    } catch (error) {
      console.error(error);
      alert("Something went wrong");
    } finally {
      setSaving(false);
    }
  };

  if (loading || !formData) {
    return (
      <div className="p-8">
        Loading service...
      </div>
    );
  }

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
          <h1 className="text-2xl font-bold">Edit Service</h1>
          <p className="text-gray-500 text-sm">Update {formData.title}</p>
        </div>
      </div>

      <form
        onSubmit={handleSubmit}
        className="space-y-8"
      >
        {/* BASIC */}
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
                name="title"
                value={formData.title}
                onChange={handleChange}
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
            Add or remove client names.
          </p>

          <div className="flex gap-3">
            <input
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
              placeholder="Client name"
              className="flex-1 border rounded-lg px-4 py-3"
            />

            <button
              type="button"
              onClick={addClient}
              className="bg-black text-white px-5 py-3 rounded-lg hover:bg-zinc-700 transition duration-300 cursor-pointer"
            >
              Add
            </button>
          </div>

          <div className="flex flex-wrap gap-3 mt-5">
            {formData.clients.map(
              (client, index) => (
                <div
                  key={`${client.name}-${index}`}
                  className="flex items-center gap-2 bg-gray-100 px-4 py-2 rounded-full"
                >
                  {client.name}

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
                name="portfolioSubtitle"
                value={formData.portfolioSubtitle}
                onChange={handleChange}
                className="w-full border rounded-lg px-4 py-3"
              />
            </div>
          </div>
        </section>

        {/* ====================== SERVICES SECTION ====================== */}
        <section className="rounded-xl p-6 bg-white shadow border border-gray-200">
          <h2 className="text-xl font-semibold mb-2">Services Section</h2>
          <p className="text-sm text-gray-500 mb-6">
            Only one section allowed. Add as many service cards as you want.
          </p>

          <div className="mb-5">
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
              className="w-full border rounded-lg px-4 py-3"
            />
          </div>

          <div className="space-y-4">
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
                  className="absolute top-3 right-3 text-red-500"
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
            className="mt-4 text-sm bg-black text-white px-4 py-2 rounded-lg"
          >
            + Add Service Card
          </button>
        </section>

        {/* ====================== PROCESS SECTION ====================== */}
        <section className="rounded-xl p-6 bg-white shadow border border-gray-200">
          <h2 className="text-xl font-semibold mb-2">Process Section</h2>
          <p className="text-sm text-gray-500 mb-6">
            Show the step-by-step process of this service.
          </p>

          <div className="mb-5">
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
              className="w-full border rounded-lg px-4 py-3"
            />
          </div>

          <div className="space-y-4">
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
                  className="absolute top-3 right-3 text-red-500"
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
            className="mt-4 text-sm bg-black text-white px-4 py-2 rounded-lg"
          >
            + Add Step
          </button>
        </section>

        {/* ====================== ABOUT SECTIONS ====================== */}
        <section className="rounded-xl p-6 bg-white shadow border border-gray-200">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-xl font-semibold">About Sections</h2>
              <p className="text-sm text-gray-500 mt-1">
                Layout alternates automatically (Content-Image / Image-Content)
              </p>
            </div>

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
              className="bg-black text-white px-4 py-2 rounded-lg text-sm"
            >
              + Add About Section
            </button>
          </div>

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
              <div>
                <label className="block mb-2 text-sm">Image</label>
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
          ))}
        </section>

        {/* ====================== FAQs ====================== */}
        <section className="rounded-xl p-6 bg-white shadow border border-gray-200">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-xl font-semibold">FAQs</h2>
              <p className="text-sm text-gray-500 mt-1">
                Add frequently asked questions
              </p>
            </div>

            <button
              type="button"
              onClick={() => {
                setFormData((prev) => ({
                  ...prev,
                  faqs: [...(prev.faqs || []), { question: "", answer: "" }],
                }));
              }}
              className="bg-black text-white px-4 py-2 rounded-lg text-sm"
            >
              + Add FAQ
            </button>
          </div>

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
        </section>

        {/* PUBLISHING */}
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
        <section className="rounded-xl p-6 bg-white shadow border border-gray-200 mb-20">
          <h2 className="text-xl font-semibold mb-6">
            SEO
          </h2>

          <div className="space-y-5">
            <div>
              <label className="block mb-2">
                Meta Title
              </label>

              <input
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
        <div className="flex justify-end gap-4 fixed bottom-0 right-0 bg-white w-full py-4 px-6 shadow border-t border-gray-200">
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
            disabled={saving}
            className="bg-black text-white px-5 py-3 rounded-lg hover:bg-zinc-700 transition duration-300 cursor-pointer disabled:opacity-50"
          >
            {saving
              ? "Saving..."
              : "Save Changes"}
          </button>
        </div>
      </form>
    </div>
  );
}
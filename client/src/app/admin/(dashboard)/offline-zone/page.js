"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { ChevronLeft } from "lucide-react";
import MediaUpload from "../../../../components/admin/MediaUpload";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export default function OfflineZoneEditPage() {
  const router = useRouter();

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [formData, setFormData] = useState(null);

  useEffect(() => {
    const fetchPage = async () => {
      try {
        const res = await fetch(`${API_URL}/offline-zone`, {
          credentials: "include",
        });
        const data = await res.json();

        if (!res.ok) {
          alert(data.message || "Failed to load Offline Zone");
          return;
        }

        const page = data.page;

        const rawMedia = page.hero?.media;
        const normalizedMedia =
          typeof rawMedia === "string"
            ? {
                type: page.hero?.mediaType || "image",
                url: rawMedia || "",
                publicId: "",
                alt: "",
              }
            : {
                type: rawMedia?.type || page.hero?.mediaType || "image",
                url: rawMedia?.url || "",
                publicId: rawMedia?.publicId || "",
                alt: rawMedia?.alt || "",
              };

        setFormData({
          hero: {
            title: page.hero?.title || "",
            subtitle: page.hero?.subtitle || "",
            mediaType: page.hero?.mediaType || normalizedMedia.type || "image",
            media: normalizedMedia,
          },
          aboutSections: page.aboutSections || [],
          faqs: page.faqs || [],
          status: page.status || "draft",
          seo: {
            metaTitle: page.seo?.metaTitle || "",
            metaDescription: page.seo?.metaDescription || "",
          },
        });
      } catch (error) {
        console.error(error);
        alert("Something went wrong while loading");
      } finally {
        setLoading(false);
      }
    };

    fetchPage();
  }, []);

  const handleHeroChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      hero: { ...prev.hero, [name]: value },
    }));
  };

  const handleSeoChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      seo: { ...prev.seo, [name]: value },
    }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setSaving(true);

      const res = await fetch(`${API_URL}/offline-zone`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.message || "Failed to save");
        return;
      }

      alert("Offline Zone updated successfully!");
    } catch (error) {
      console.error(error);
      alert("Something went wrong");
    } finally {
      setSaving(false);
    }
  };

  if (loading || !formData) {
    return <div className="p-8">Loading Offline Zone...</div>;
  }

  return (
    <div className="mx-auto relative p-8">
      <div className="mb-8 flex items-start justify-start gap-4">
        <button
          type="button"
          onClick={() => router.push("/admin")}
          className="bg-black text-white p-2 rounded-full hover:bg-zinc-700 transition duration-300 cursor-pointer"
        >
          <ChevronLeft size={16} />
        </button>

        <div>
          <h1 className="text-2xl font-bold">Offline Zone</h1>
          <p className="text-gray-500 text-sm">
            Manage the Offline / Ground Zone landing page
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* HERO */}
        <section className="rounded-xl bg-white border border-gray-200 pb-4">
          <h2 className="font-medium mb-2 bg-primary px-4 py-2 rounded-t-xl text-white">
            Hero Section
          </h2>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 px-4 pt-2">
            <div>
              <div className="mb-5">
                <label className="block leading-5 text-xs">Hero Title</label>
                <input
                  type="text"
                  name="title"
                  value={formData.hero.title}
                  onChange={handleHeroChange}
                  placeholder="Ground Marketing Excellence"
                  className="w-full border rounded-lg px-3 py-2 text-sm"
                />
              </div>

              <div className="mb-5">
                <label className="block leading-5 text-xs">Hero Subtitle</label>
                <textarea
                  name="subtitle"
                  value={formData.hero.subtitle}
                  onChange={handleHeroChange}
                  rows={3}
                  placeholder="We create powerful offline experiences that connect brands with people"
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

            <div className="max-w-md">
              <MediaUpload
                label="Hero Media"
                value={formData.hero.media}
                onChange={(media) =>
                  setFormData((prev) => ({
                    ...prev,
                    hero: {
                      ...prev.hero,
                      mediaType: media.type || prev.hero.mediaType,
                      media: { ...prev.hero.media, ...media },
                    },
                  }))
                }
              />
            </div>
          </div>
        </section>

        {/* ABOUT SECTIONS */}
        <section className="rounded-xl bg-white border border-gray-200 pb-4">
          <h2 className="font-medium mb-2 bg-primary px-4 py-2 rounded-t-xl text-white">
            About Sections
          </h2>
          <p className="text-xs text-red-500 mb-2 px-4">
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
                  className="absolute top-4 right-4 text-red-500 text-sm"
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
                    className="w-full border rounded-lg px-3 py-2 text-sm"
                    placeholder="What is Offline Marketing?"
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
                    className="w-full border rounded-lg px-3 py-2 text-sm"
                  />
                </div>

                <div className="grid gap-6 grid-cols-1 md:grid-cols-2">
                  <div>
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
                          className="flex-1 border rounded-lg px-3 py-2 text-sm"
                          placeholder="High brand recall & engagement"
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
                        if (!updated[sectionIndex].bullets) {
                          updated[sectionIndex].bullets = [];
                        }
                        updated[sectionIndex].bullets.push("");
                        setFormData((prev) => ({ ...prev, aboutSections: updated }));
                      }}
                      className="text-sm text-blue-600"
                    >
                      + Add Bullet
                    </button>
                  </div>

                  <div className="w-full max-w-xs">
                    <MediaUpload
                      label="Section Image"
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

        {/* FAQs */}
        <section className="rounded-xl bg-white border border-gray-200 pb-4">
          <h2 className="font-medium mb-2 bg-primary px-4 py-2 rounded-t-xl text-white">
            FAQs
          </h2>

          <div className="px-4 grid grid-cols-1 md:grid-cols-2 gap-4">
            {(formData.faqs || []).map((faq, index) => (
              <div key={index} className="border rounded-lg p-4 relative bg-gray-50">
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
                    className="w-full border rounded-lg px-3 py-2 text-sm"
                    placeholder="What is included in ground marketing?"
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
                    className="w-full border rounded-lg px-3 py-2 text-sm"
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
            className="mt-4 bg-black text-white px-4 py-2 rounded-lg text-sm ml-4 hover:bg-black/80 cursor-pointer"
          >
            + Add FAQ
          </button>
        </section>

        {/* PUBLISHING */}
        <section className="rounded-xl bg-white border border-gray-200 pb-4">
          <h2 className="font-medium mb-2 bg-primary px-4 py-2 rounded-t-xl text-white">
            Publishing Settings
          </h2>

          <div className="px-4 max-w-xs">
            <label className="block leading-5 text-xs">Status</label>
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
        </section>

        {/* SEO */}
        <section className="rounded-xl bg-white border border-gray-200 pb-4">
          <h2 className="font-medium mb-2 bg-primary px-4 py-2 rounded-t-xl text-white">
            SEO
          </h2>

          <div className="space-y-5 px-4">
            <div>
              <label className="block leading-5 text-xs">Meta Title</label>
              <input
                type="text"
                name="metaTitle"
                value={formData.seo.metaTitle}
                onChange={handleSeoChange}
                className="w-full border rounded-lg px-3 py-2 text-sm"
              />
            </div>

            <div>
              <label className="block leading-5 text-xs">Meta Description</label>
              <textarea
                name="metaDescription"
                value={formData.seo.metaDescription}
                onChange={handleSeoChange}
                rows={4}
                className="w-full border rounded-lg px-3 py-2 text-sm"
              />
            </div>
          </div>
        </section>

        {/* SUBMIT */}
        <div className="flex justify-end gap-4 fixed bottom-0 right-0 bg-white w-full py-4 px-6 shadow border-t border-gray-200 z-20">
          <button
            type="button"
            onClick={() => router.push("/admin")}
            className="rounded-lg border px-4 py-2 text-sm font-medium transition hover:bg-black hover:text-white cursor-pointer"
          >
            Cancel
          </button>

          <button
            type="submit"
            disabled={saving}
            className="bg-black text-white px-5 py-3 rounded-lg hover:bg-zinc-700 transition duration-300 cursor-pointer disabled:opacity-50"
          >
            {saving ? "Saving..." : "Save Changes"}
          </button>
        </div>
      </form>
    </div>
  );
}
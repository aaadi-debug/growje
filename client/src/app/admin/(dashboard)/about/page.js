"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { ChevronLeft } from "lucide-react";
import MediaUpload from "@/components/admin/MediaUpload"; // adjust path

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export default function AboutAdminPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [formData, setFormData] = useState(null);

  useEffect(() => {
    const fetchPage = async () => {
      try {
        const res = await fetch(`${API_URL}/about-page`, {
          credentials: "include",
        });
        const data = await res.json();
        if (!res.ok) {
          alert(data.message || "Failed to load");
          return;
        }
        const page = data.page;
        setFormData({
          hero: {
            eyebrow: page.hero?.eyebrow || "About GROWJE",
            titleLine1: page.hero?.titleLine1 || "We build brands",
            titleLine2: page.hero?.titleLine2 || "people remember.",
            subtitle: page.hero?.subtitle || "",
            ctaText: page.hero?.ctaText || "Get A Quote",
            ctaLink: page.hero?.ctaLink || "/contact-us",
            backgroundImage: page.hero?.backgroundImage || {
              url: "",
              publicId: "",
              alt: "",
            },
            stats: page.hero?.stats?.length
              ? page.hero.stats
              : [
                  { value: "1000+", label: "Global Projects Complete" },
                  { value: "800+", label: "Clients Satisfaction" },
                ],
          },
          founder: {
            name: page.founder?.name || "",
            designation: page.founder?.designation || "",
            image: page.founder?.image || { url: "", publicId: "", alt: "" },
          },
          about: {
            eyebrow: page.about?.eyebrow || "About Growje",
            title: page.about?.title || "",
            paragraphs: page.about?.paragraphs?.length
              ? page.about.paragraphs
              : [""],
          },
          journey: {
            eyebrow: page.journey?.eyebrow || "Our Journey",
            title: page.journey?.title || "From idea to impact",
            items: page.journey?.items?.length
              ? page.journey.items
              : [{ year: "", title: "", description: "" }],
          },
          mission: {
            title: page.mission?.title || "Company Mission",
            description: page.mission?.description || "",
            image: page.mission?.image || { url: "", publicId: "", alt: "" },
          },
          vision: {
            title: page.vision?.title || "Our Vision",
            description: page.vision?.description || "",
            image: page.vision?.image || { url: "", publicId: "", alt: "" },
          },
          values: {
            title: page.values?.title || "Our way of working",
            items: page.values?.items?.length
              ? page.values.items
              : [
                  { number: "01", title: "", description: "" },
                  { number: "02", title: "", description: "" },
                ],
          },
          approach: {
            title: page.approach?.title || "Our Secret Sauce",
            desktopImages: page.approach?.desktopImages || [],
            mobileImages: page.approach?.mobileImages || [],
          },
          status: page.status || "published",
          seo: {
            metaTitle: page.seo?.metaTitle || "",
            metaDescription: page.seo?.metaDescription || "",
          },
        });
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchPage();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setSaving(true);
      const res = await fetch(`${API_URL}/about-page`, {
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
      alert("About page updated successfully!");
    } catch (err) {
      alert("Something went wrong");
    } finally {
      setSaving(false);
    }
  };

  if (loading || !formData) {
    return <div className="p-8">Loading About page...</div>;
  }

  return (
    <div className="p-8 relative pb-28">
      <div className="mb-8 flex items-start gap-4">
        <button
          type="button"
          onClick={() => router.push("/admin")}
          className="bg-black text-white p-2 rounded-full hover:bg-zinc-700"
        >
          <ChevronLeft size={16} />
        </button>
        <div>
          <h1 className="text-2xl font-bold">About Page</h1>
          <p className="text-gray-500 text-sm">
            Manage all content on the About Us page
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* ========== HERO ========== */}
        <section className="rounded-xl bg-white border border-gray-200 pb-4">
          <h2 className="font-medium mb-2 bg-primary px-4 py-2 rounded-t-xl text-white">
            Hero Section
          </h2>
          <div className="grid md:grid-cols-2 gap-4 px-4 pt-2">
            <div>
              <label className="block text-xs mb-1">Eyebrow</label>
              <input
                className="w-full border rounded-lg px-3 py-2 text-sm"
                value={formData.hero.eyebrow}
                onChange={(e) =>
                  setFormData((p) => ({
                    ...p,
                    hero: { ...p.hero, eyebrow: e.target.value },
                  }))
                }
              />
            </div>
            <div>
              <label className="block text-xs mb-1">CTA Text</label>
              <input
                className="w-full border rounded-lg px-3 py-2 text-sm"
                value={formData.hero.ctaText}
                onChange={(e) =>
                  setFormData((p) => ({
                    ...p,
                    hero: { ...p.hero, ctaText: e.target.value },
                  }))
                }
              />
            </div>
            <div>
              <label className="block text-xs mb-1">Title line 1</label>
              <input
                className="w-full border rounded-lg px-3 py-2 text-sm"
                value={formData.hero.titleLine1}
                onChange={(e) =>
                  setFormData((p) => ({
                    ...p,
                    hero: { ...p.hero, titleLine1: e.target.value },
                  }))
                }
              />
            </div>
            <div>
              <label className="block text-xs mb-1">Title line 2</label>
              <input
                className="w-full border rounded-lg px-3 py-2 text-sm"
                value={formData.hero.titleLine2}
                onChange={(e) =>
                  setFormData((p) => ({
                    ...p,
                    hero: { ...p.hero, titleLine2: e.target.value },
                  }))
                }
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-xs mb-1">Subtitle</label>
              <textarea
                rows={3}
                className="w-full border rounded-lg px-3 py-2 text-sm"
                value={formData.hero.subtitle}
                onChange={(e) =>
                  setFormData((p) => ({
                    ...p,
                    hero: { ...p.hero, subtitle: e.target.value },
                  }))
                }
              />
            </div>
            <div className="max-w-xs">
              <MediaUpload
                label="Hero background"
                value={formData.hero.backgroundImage}
                onChange={(media) =>
                  setFormData((p) => ({
                    ...p,
                    hero: { ...p.hero, backgroundImage: media },
                  }))
                }
              />
            </div>
          </div>

          {/* Hero stats */}
          <div className="px-4 mt-6">
            <p className="text-sm font-medium mb-3">Hero stats</p>
            {formData.hero.stats.map((stat, i) => (
              <div key={i} className="flex gap-3 mb-2">
                <input
                  placeholder="1000+"
                  className="border rounded-lg px-3 py-2 text-sm w-32"
                  value={stat.value}
                  onChange={(e) => {
                    const stats = [...formData.hero.stats];
                    stats[i].value = e.target.value;
                    setFormData((p) => ({
                      ...p,
                      hero: { ...p.hero, stats },
                    }));
                  }}
                />
                <input
                  placeholder="Label"
                  className="border rounded-lg px-3 py-2 text-sm flex-1"
                  value={stat.label}
                  onChange={(e) => {
                    const stats = [...formData.hero.stats];
                    stats[i].label = e.target.value;
                    setFormData((p) => ({
                      ...p,
                      hero: { ...p.hero, stats },
                    }));
                  }}
                />
                <button
                  type="button"
                  className="text-red-500 text-sm"
                  onClick={() => {
                    const stats = formData.hero.stats.filter((_, idx) => idx !== i);
                    setFormData((p) => ({
                      ...p,
                      hero: { ...p.hero, stats },
                    }));
                  }}
                >
                  ×
                </button>
              </div>
            ))}
            <button
              type="button"
              className="text-sm text-blue-600"
              onClick={() =>
                setFormData((p) => ({
                  ...p,
                  hero: {
                    ...p.hero,
                    stats: [...p.hero.stats, { value: "", label: "" }],
                  },
                }))
              }
            >
              + Add stat
            </button>
          </div>
        </section>

        {/* ========== FOUNDER ========== */}
        <section className="rounded-xl bg-white border border-gray-200 pb-4">
          <h2 className="font-medium mb-2 bg-primary px-4 py-2 rounded-t-xl text-white">
            Founder
          </h2>
          <div className="grid md:grid-cols-2 gap-4 px-4 pt-2">
            <div>
              <label className="block text-xs mb-1">Name</label>
              <input
                className="w-full border rounded-lg px-3 py-2 text-sm"
                value={formData.founder.name}
                onChange={(e) =>
                  setFormData((p) => ({
                    ...p,
                    founder: { ...p.founder, name: e.target.value },
                  }))
                }
              />
            </div>
            <div>
              <label className="block text-xs mb-1">Designation</label>
              <input
                className="w-full border rounded-lg px-3 py-2 text-sm"
                value={formData.founder.designation}
                onChange={(e) =>
                  setFormData((p) => ({
                    ...p,
                    founder: { ...p.founder, designation: e.target.value },
                  }))
                }
              />
            </div>
            <div className="max-w-xs">
              <MediaUpload
                label="Founder image"
                value={formData.founder.image}
                onChange={(media) =>
                  setFormData((p) => ({
                    ...p,
                    founder: { ...p.founder, image: media },
                  }))
                }
              />
            </div>
          </div>
        </section>

        {/* ========== ABOUT PARAGRAPHS ========== */}
        <section className="rounded-xl bg-white border border-gray-200 pb-4">
          <h2 className="font-medium mb-2 bg-primary px-4 py-2 rounded-t-xl text-white">
            About story
          </h2>
          <div className="px-4 pt-2 space-y-3">
            <input
              className="w-full border rounded-lg px-3 py-2 text-sm"
              placeholder="Section title"
              value={formData.about.title}
              onChange={(e) =>
                setFormData((p) => ({
                  ...p,
                  about: { ...p.about, title: e.target.value },
                }))
              }
            />
            {formData.about.paragraphs.map((para, i) => (
              <div key={i} className="relative">
                <textarea
                  rows={3}
                  className="w-full border rounded-lg px-3 py-2 text-sm"
                  value={para}
                  onChange={(e) => {
                    const paragraphs = [...formData.about.paragraphs];
                    paragraphs[i] = e.target.value;
                    setFormData((p) => ({
                      ...p,
                      about: { ...p.about, paragraphs },
                    }));
                  }}
                />
                <button
                  type="button"
                  className="absolute top-2 right-2 text-red-500 text-sm"
                  onClick={() => {
                    const paragraphs = formData.about.paragraphs.filter(
                      (_, idx) => idx !== i
                    );
                    setFormData((p) => ({
                      ...p,
                      about: { ...p.about, paragraphs },
                    }));
                  }}
                >
                  ×
                </button>
              </div>
            ))}
            <button
              type="button"
              className="text-sm bg-black text-white px-3 py-1.5 rounded-lg"
              onClick={() =>
                setFormData((p) => ({
                  ...p,
                  about: {
                    ...p.about,
                    paragraphs: [...p.about.paragraphs, ""],
                  },
                }))
              }
            >
              + Add paragraph
            </button>
          </div>
        </section>

        {/* ========== JOURNEY ========== */}
        <section className="rounded-xl bg-white border border-gray-200 pb-4">
          <h2 className="font-medium mb-2 bg-primary px-4 py-2 rounded-t-xl text-white">
            Journey
          </h2>
          <div className="px-4 pt-2 space-y-4">
            <input
              className="w-full border rounded-lg px-3 py-2 text-sm"
              placeholder="Journey title"
              value={formData.journey.title}
              onChange={(e) =>
                setFormData((p) => ({
                  ...p,
                  journey: { ...p.journey, title: e.target.value },
                }))
              }
            />
            {formData.journey.items.map((item, i) => (
              <div key={i} className="border rounded-lg p-4 bg-gray-50 relative">
                <button
                  type="button"
                  className="absolute top-3 right-3 text-red-500"
                  onClick={() => {
                    const items = formData.journey.items.filter(
                      (_, idx) => idx !== i
                    );
                    setFormData((p) => ({
                      ...p,
                      journey: { ...p.journey, items },
                    }));
                  }}
                >
                  ×
                </button>
                <div className="grid md:grid-cols-2 gap-3">
                  <input
                    placeholder="Year"
                    className="border rounded-lg px-3 py-2 text-sm"
                    value={item.year}
                    onChange={(e) => {
                      const items = [...formData.journey.items];
                      items[i].year = e.target.value;
                      setFormData((p) => ({
                        ...p,
                        journey: { ...p.journey, items },
                      }));
                    }}
                  />
                  <input
                    placeholder="Title"
                    className="border rounded-lg px-3 py-2 text-sm"
                    value={item.title}
                    onChange={(e) => {
                      const items = [...formData.journey.items];
                      items[i].title = e.target.value;
                      setFormData((p) => ({
                        ...p,
                        journey: { ...p.journey, items },
                      }));
                    }}
                  />
                </div>
                <textarea
                  rows={3}
                  placeholder="Description"
                  className="w-full border rounded-lg px-3 py-2 text-sm mt-3"
                  value={item.description}
                  onChange={(e) => {
                    const items = [...formData.journey.items];
                    items[i].description = e.target.value;
                    setFormData((p) => ({
                      ...p,
                      journey: { ...p.journey, items },
                    }));
                  }}
                />
              </div>
            ))}
            <button
              type="button"
              className="text-sm bg-black text-white px-3 py-1.5 rounded-lg"
              onClick={() =>
                setFormData((p) => ({
                  ...p,
                  journey: {
                    ...p.journey,
                    items: [
                      ...p.journey.items,
                      { year: "", title: "", description: "" },
                    ],
                  },
                }))
              }
            >
              + Add journey item
            </button>
          </div>
        </section>

        {/* ========== MISSION / VISION ========== */}
        <section className="rounded-xl bg-white border border-gray-200 pb-4">
          <h2 className="font-medium mb-2 bg-primary px-4 py-2 rounded-t-xl text-white">
            Mission & Vision
          </h2>
          <div className="grid md:grid-cols-2 gap-6 px-4 pt-2">
            <div>
              <p className="text-sm font-medium mb-2">Mission</p>
              <input
                className="w-full border rounded-lg px-3 py-2 text-sm mb-2"
                value={formData.mission.title}
                onChange={(e) =>
                  setFormData((p) => ({
                    ...p,
                    mission: { ...p.mission, title: e.target.value },
                  }))
                }
              />
              <textarea
                rows={4}
                className="w-full border rounded-lg px-3 py-2 text-sm mb-2"
                value={formData.mission.description}
                onChange={(e) =>
                  setFormData((p) => ({
                    ...p,
                    mission: { ...p.mission, description: e.target.value },
                  }))
                }
              />
              <MediaUpload
                label="Mission image"
                value={formData.mission.image}
                onChange={(media) =>
                  setFormData((p) => ({
                    ...p,
                    mission: { ...p.mission, image: media },
                  }))
                }
              />
            </div>
            <div>
              <p className="text-sm font-medium mb-2">Vision</p>
              <input
                className="w-full border rounded-lg px-3 py-2 text-sm mb-2"
                value={formData.vision.title}
                onChange={(e) =>
                  setFormData((p) => ({
                    ...p,
                    vision: { ...p.vision, title: e.target.value },
                  }))
                }
              />
              <textarea
                rows={4}
                className="w-full border rounded-lg px-3 py-2 text-sm mb-2"
                value={formData.vision.description}
                onChange={(e) =>
                  setFormData((p) => ({
                    ...p,
                    vision: { ...p.vision, description: e.target.value },
                  }))
                }
              />
              <MediaUpload
                label="Vision image"
                value={formData.vision.image}
                onChange={(media) =>
                  setFormData((p) => ({
                    ...p,
                    vision: { ...p.vision, image: media },
                  }))
                }
              />
            </div>
          </div>
        </section>

        {/* ========== VALUES ========== */}
        <section className="rounded-xl bg-white border border-gray-200 pb-4">
          <h2 className="font-medium mb-2 bg-primary px-4 py-2 rounded-t-xl text-white">
            Values / Way of working
          </h2>
          <div className="px-4 pt-2 space-y-4">
            <input
              className="w-full border rounded-lg px-3 py-2 text-sm"
              value={formData.values.title}
              onChange={(e) =>
                setFormData((p) => ({
                  ...p,
                  values: { ...p.values, title: e.target.value },
                }))
              }
            />
            {formData.values.items.map((item, i) => (
              <div key={i} className="border rounded-lg p-4 bg-gray-50 relative">
                <button
                  type="button"
                  className="absolute top-3 right-3 text-red-500"
                  onClick={() => {
                    const items = formData.values.items.filter(
                      (_, idx) => idx !== i
                    );
                    setFormData((p) => ({
                      ...p,
                      values: { ...p.values, items },
                    }));
                  }}
                >
                  ×
                </button>
                <div className="grid grid-cols-3 gap-3 mb-2">
                  <input
                    placeholder="01"
                    className="border rounded-lg px-3 py-2 text-sm"
                    value={item.number}
                    onChange={(e) => {
                      const items = [...formData.values.items];
                      items[i].number = e.target.value;
                      setFormData((p) => ({
                        ...p,
                        values: { ...p.values, items },
                      }));
                    }}
                  />
                  <input
                    placeholder="Title"
                    className="border rounded-lg px-3 py-2 text-sm col-span-2"
                    value={item.title}
                    onChange={(e) => {
                      const items = [...formData.values.items];
                      items[i].title = e.target.value;
                      setFormData((p) => ({
                        ...p,
                        values: { ...p.values, items },
                      }));
                    }}
                  />
                </div>
                <textarea
                  rows={2}
                  placeholder="Description"
                  className="w-full border rounded-lg px-3 py-2 text-sm"
                  value={item.description}
                  onChange={(e) => {
                    const items = [...formData.values.items];
                    items[i].description = e.target.value;
                    setFormData((p) => ({
                      ...p,
                      values: { ...p.values, items },
                    }));
                  }}
                />
              </div>
            ))}
            <button
              type="button"
              className="text-sm bg-black text-white px-3 py-1.5 rounded-lg"
              onClick={() =>
                setFormData((p) => ({
                  ...p,
                  values: {
                    ...p.values,
                    items: [
                      ...p.values.items,
                      {
                        number: String(p.values.items.length + 1).padStart(
                          2,
                          "0"
                        ),
                        title: "",
                        description: "",
                      },
                    ],
                  },
                }))
              }
            >
              + Add value
            </button>
          </div>
        </section>

        {/* ========== APPROACH IMAGES ========== */}
        <section className="rounded-xl bg-white border border-gray-200 pb-4">
          <h2 className="font-medium mb-2 bg-primary px-4 py-2 rounded-t-xl text-white">
            Secret Sauce / Approach images
          </h2>
          <div className="px-4 pt-2 space-y-4">
            <input
              className="w-full border rounded-lg px-3 py-2 text-sm"
              value={formData.approach.title}
              onChange={(e) =>
                setFormData((p) => ({
                  ...p,
                  approach: { ...p.approach, title: e.target.value },
                }))
              }
            />
            <p className="text-xs text-gray-500">
              Desktop images (shown on md+)
            </p>
            {formData.approach.desktopImages.map((img, i) => (
              <div key={i} className="flex items-start gap-3">
                <div className="max-w-xs flex-1">
                  <MediaUpload
                    label={`Desktop image ${i + 1}`}
                    value={img}
                    onChange={(media) => {
                      const desktopImages = [
                        ...formData.approach.desktopImages,
                      ];
                      desktopImages[i] = media;
                      setFormData((p) => ({
                        ...p,
                        approach: { ...p.approach, desktopImages },
                      }));
                    }}
                  />
                </div>
                <button
                  type="button"
                  className="text-red-500 mt-6"
                  onClick={() => {
                    const desktopImages =
                      formData.approach.desktopImages.filter(
                        (_, idx) => idx !== i
                      );
                    setFormData((p) => ({
                      ...p,
                      approach: { ...p.approach, desktopImages },
                    }));
                  }}
                >
                  ×
                </button>
              </div>
            ))}
            <button
              type="button"
              className="text-sm text-blue-600"
              onClick={() =>
                setFormData((p) => ({
                  ...p,
                  approach: {
                    ...p.approach,
                    desktopImages: [
                      ...p.approach.desktopImages,
                      { url: "", publicId: "", alt: "" },
                    ],
                  },
                }))
              }
            >
              + Add desktop image
            </button>

            <p className="text-xs text-gray-500 mt-4">
              Mobile images (shown on small screens)
            </p>
            {formData.approach.mobileImages.map((img, i) => (
              <div key={i} className="flex items-start gap-3">
                <div className="max-w-xs flex-1">
                  <MediaUpload
                    label={`Mobile image ${i + 1}`}
                    value={img}
                    onChange={(media) => {
                      const mobileImages = [...formData.approach.mobileImages];
                      mobileImages[i] = media;
                      setFormData((p) => ({
                        ...p,
                        approach: { ...p.approach, mobileImages },
                      }));
                    }}
                  />
                </div>
                <button
                  type="button"
                  className="text-red-500 mt-6"
                  onClick={() => {
                    const mobileImages = formData.approach.mobileImages.filter(
                      (_, idx) => idx !== i
                    );
                    setFormData((p) => ({
                      ...p,
                      approach: { ...p.approach, mobileImages },
                    }));
                  }}
                >
                  ×
                </button>
              </div>
            ))}
            <button
              type="button"
              className="text-sm text-blue-600"
              onClick={() =>
                setFormData((p) => ({
                  ...p,
                  approach: {
                    ...p.approach,
                    mobileImages: [
                      ...p.approach.mobileImages,
                      { url: "", publicId: "", alt: "" },
                    ],
                  },
                }))
              }
            >
              + Add mobile image
            </button>
          </div>
        </section>

        {/* ========== SEO ========== */}
        <section className="rounded-xl bg-white border border-gray-200 pb-4">
          <h2 className="font-medium mb-2 bg-primary px-4 py-2 rounded-t-xl text-white">
            SEO
          </h2>
          <div className="space-y-3 px-4 pt-2">
            <input
              className="w-full border rounded-lg px-3 py-2 text-sm"
              placeholder="Meta title"
              value={formData.seo.metaTitle}
              onChange={(e) =>
                setFormData((p) => ({
                  ...p,
                  seo: { ...p.seo, metaTitle: e.target.value },
                }))
              }
            />
            <textarea
              rows={3}
              className="w-full border rounded-lg px-3 py-2 text-sm"
              placeholder="Meta description"
              value={formData.seo.metaDescription}
              onChange={(e) =>
                setFormData((p) => ({
                  ...p,
                  seo: { ...p.seo, metaDescription: e.target.value },
                }))
              }
            />
          </div>
        </section>

        <div className="fixed bottom-0 right-0 left-0 md:left-64 bg-white border-t py-4 px-6 flex justify-end gap-4 z-20">
          <button
            type="button"
            onClick={() => router.push("/admin")}
            className="border px-4 py-2 rounded-lg text-sm"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={saving}
            className="bg-black text-white px-5 py-3 rounded-lg disabled:opacity-50"
          >
            {saving ? "Saving..." : "Save About Page"}
          </button>
        </div>
      </form>
    </div>
  );
}
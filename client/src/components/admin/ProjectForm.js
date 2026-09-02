"use client";

import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import MediaUpload from "./MediaUpload";

export default function ProjectForm({
  initialData,
  services,
  onSubmit,
  saving,
  submitText = "Save Project",
}) {
    const router = useRouter();
  
  const [formData, setFormData] = useState({
    title: initialData?.title || "",
    slug: initialData?.slug || "",
    clientName: initialData?.clientName || "",
    shortDescription: initialData?.shortDescription || "",
    category: initialData?.category || "",

    services:
      initialData?.services?.map((service) =>
        typeof service === "string" ? service : service._id
      ) || [],

    workedOn: initialData?.workedOn || [],

    hero: {
      media: {
        type: initialData?.hero?.media?.type || "image",
        url: initialData?.hero?.media?.url || "",
        alt: initialData?.hero?.media?.alt || "",
        poster: initialData?.hero?.media?.poster || "",
        publicId: initialData?.hero?.media?.publicId || "",
      },
    },

    about: {
      title: initialData?.about?.title || "About the project",
      description: initialData?.about?.description || "",
      backgroundMedia: {
        type: initialData?.about?.backgroundMedia?.type || "image",
        url: initialData?.about?.backgroundMedia?.url || "",
        alt: initialData?.about?.backgroundMedia?.alt || "",
        poster: initialData?.about?.backgroundMedia?.poster || "",
        publicId: initialData?.about?.backgroundMedia?.publicId || "",
      },
    },

    showcaseSections:
      initialData?.showcaseSections?.map((section) => ({
        ...section,
        items:
          section.items?.map((item) => ({
            ...item,
            media: {
              type: item.media?.type || "image",
              url: item.media?.url || "",
              alt: item.media?.alt || "",
              poster: item.media?.poster || "",
              publicId: item.media?.publicId || "",
            },
          })) || [],
      })) || [],

    status: initialData?.status || "draft",
    order: initialData?.order || 0,

    seo: {
      metaTitle: initialData?.seo?.metaTitle || "",
      metaDescription: initialData?.seo?.metaDescription || "",
    },
  });

  const [workedOnInput, setWorkedOnInput] = useState("");

  // =====================================
  // BASIC INPUT
  // =====================================

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // =====================================
  // SLUG
  // =====================================

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
      slug:
        prev.slug === "" || prev.slug === generateSlug(prev.title)
          ? generateSlug(value)
          : prev.slug,
    }));
  };

  // =====================================
  // SERVICES
  // =====================================

  const toggleService = (serviceId) => {
    setFormData((prev) => ({
      ...prev,
      services: prev.services.includes(serviceId)
        ? prev.services.filter((id) => id !== serviceId)
        : [...prev.services, serviceId],
    }));
  };

  // =====================================
  // WORKED ON
  // =====================================

  const addWorkedOn = () => {
    const value = workedOnInput.trim();
    if (!value) return;

    setFormData((prev) => ({
      ...prev,
      workedOn: [...prev.workedOn, value],
    }));

    setWorkedOnInput("");
  };

  const removeWorkedOn = (index) => {
    setFormData((prev) => ({
      ...prev,
      workedOn: prev.workedOn.filter((_, i) => i !== index),
    }));
  };

  // =====================================
  // HERO MEDIA
  // =====================================

  const updateHeroMedia = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      hero: {
        ...prev.hero,
        media: {
          ...prev.hero.media,
          [field]: value,
        },
      },
    }));
  };

  // =====================================
  // ABOUT
  // =====================================

  const updateAbout = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      about: {
        ...prev.about,
        [field]: value,
      },
    }));
  };

  const updateAboutMedia = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      about: {
        ...prev.about,
        backgroundMedia: {
          ...prev.about.backgroundMedia,
          [field]: value,
        },
      },
    }));
  };

  // =====================================
  // SHOWCASE SECTION
  // =====================================

  const addShowcaseSection = () => {
    setFormData((prev) => ({
      ...prev,
      showcaseSections: [
        ...prev.showcaseSections,
        {
          title: "",
          layout: "full",
          columns: 1,
          gap: 20,
          items: [
            {
              media: {
                type: "image",
                url: "",
                alt: "",
                poster: "",
                publicId: "",
              },
              title: "",
              description: "",
              order: 0,
            },
          ],
          order: prev.showcaseSections.length,
        },
      ],
    }));
  };

  const removeShowcaseSection = (sectionIndex) => {
    setFormData((prev) => ({
      ...prev,
      showcaseSections: prev.showcaseSections.filter(
        (_, index) => index !== sectionIndex
      ),
    }));
  };

  const updateSection = (sectionIndex, field, value) => {
    setFormData((prev) => {
      const sections = [...prev.showcaseSections];
      sections[sectionIndex] = {
        ...sections[sectionIndex],
        [field]: value,
      };
      return {
        ...prev,
        showcaseSections: sections,
      };
    });
  };

  // =====================================
  // SHOWCASE ITEM
  // =====================================

  const addShowcaseItem = (sectionIndex) => {
    setFormData((prev) => {
      const sections = [...prev.showcaseSections];

      sections[sectionIndex].items.push({
        media: {
          type: "image",
          url: "",
          alt: "",
          poster: "",
          publicId: "",
        },
        title: "",
        description: "",
        order: sections[sectionIndex].items.length,
      });

      return {
        ...prev,
        showcaseSections: sections,
      };
    });
  };

  const removeShowcaseItem = (sectionIndex, itemIndex) => {
    setFormData((prev) => {
      const sections = [...prev.showcaseSections];

      sections[sectionIndex].items = sections[sectionIndex].items.filter(
        (_, index) => index !== itemIndex
      );

      return {
        ...prev,
        showcaseSections: sections,
      };
    });
  };

  const updateShowcaseItem = (sectionIndex, itemIndex, field, value) => {
    setFormData((prev) => {
      const sections = [...prev.showcaseSections];

      sections[sectionIndex].items[itemIndex] = {
        ...sections[sectionIndex].items[itemIndex],
        [field]: value,
      };

      return {
        ...prev,
        showcaseSections: sections,
      };
    });
  };

  const updateShowcaseMedia = (sectionIndex, itemIndex, field, value) => {
    setFormData((prev) => {
      const sections = [...prev.showcaseSections];
      const item = sections[sectionIndex].items[itemIndex];

      sections[sectionIndex].items[itemIndex] = {
        ...item,
        media: {
          ...item.media,
          [field]: value,
        },
      };

      return {
        ...prev,
        showcaseSections: sections,
      };
    });
  };

  // =====================================
  // SEO
  // =====================================

  const updateSeo = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      seo: {
        ...prev.seo,
        [field]: value,
      },
    }));
  };

  // =====================================
  // SUBMIT
  // =====================================

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {/* =================================
          BASIC INFORMATION
      ================================= */}
      <section className="rounded-xl p-6 bg-white shadow border border-gray-200">
        <h2 className="text-xl font-semibold mb-6">Basic Information</h2>

        <div className="grid md:grid-cols-2 gap-5">
          <input
            value={formData.title}
            onChange={handleTitleChange}
            placeholder="Project title"
            className="border rounded-lg px-4 py-3"
            required
          />

          <input
            name="slug"
            value={formData.slug}
            onChange={handleChange}
            placeholder="project-slug"
            className="border rounded-lg px-4 py-3"
            required
          />

          <input
            name="clientName"
            value={formData.clientName}
            onChange={handleChange}
            placeholder="Client name"
            className="border rounded-lg px-4 py-3"
          />

          <input
            name="category"
            value={formData.category}
            onChange={handleChange}
            placeholder="Category"
            className="border rounded-lg px-4 py-3"
          />
        </div>

        <textarea
          name="shortDescription"
          value={formData.shortDescription}
          onChange={handleChange}
          placeholder="Short project description"
          rows={4}
          className="w-full border rounded-lg px-4 py-3 mt-5"
        />
      </section>

      {/* =================================
          SERVICES
      ================================= */}
      <section className="rounded-xl p-6 bg-white shadow border border-gray-200">
        <h2 className="text-xl font-semibold">Services</h2>
        <p className="text-gray-500 text-sm mb-5">
          Select the services associated with this project.
        </p>

        {services.length === 0 ? (
          <p className="text-red-500">No services available.</p>
        ) : (
          <div className="grid md:grid-cols-3 gap-4">
            {services.map((service) => (
              <label
                key={service._id}
                className="flex items-center gap-3 border rounded-lg p-4 cursor-pointer"
              >
                <input
                  type="checkbox"
                  checked={formData.services.includes(service._id)}
                  onChange={() => toggleService(service._id)}
                />
                <span>{service.title}</span>
              </label>
            ))}
          </div>
        )}
      </section>

      {/* =================================
          WORKED ON
      ================================= */}
      <section className="rounded-xl p-6 bg-white shadow border border-gray-200">
        <h2 className="text-xl font-semibold mb-5">Worked On</h2>

        <div className="flex gap-3">
          <input
            value={workedOnInput}
            onChange={(e) => setWorkedOnInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                addWorkedOn();
              }
            }}
            placeholder="Example: UI/UX Design"
            className="flex-1 border rounded-lg px-4 py-3"
          />

          <button
            type="button"
            onClick={addWorkedOn}
            className="bg-black text-white px-5 py-3 rounded-lg hover:bg-zinc-700 transition duration-300 cursor-pointer disabled:opacity-50"
          >
            Add
          </button>
        </div>

        <div className="flex flex-wrap gap-3 mt-5">
          {formData.workedOn.map((item, index) => (
            <div
              key={`${item}-${index}`}
              className="bg-gray-100 px-4 py-2 rounded-full"
            >
              {item}
              <button
                type="button"
                onClick={() => removeWorkedOn(index)}
                className="ml-3 text-red-500"
              >
                ×
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* =================================
          HERO
      ================================= */}
      <section className="rounded-xl p-6 bg-white shadow border border-gray-200">
        <h2 className="text-xl font-semibold mb-6">Hero Media</h2>

        <div className="grid md:grid-cols-2 gap-5 mb-5">
          <div>
            <select
              value={formData.hero.media.type}
              onChange={(e) => updateHeroMedia("type", e.target.value)}
              className="border rounded-lg px-4 py-3 w-full"
            >
              <option value="image">Image</option>
              <option value="gif">GIF</option>
              <option value="video">Video</option>
            </select>
          </div>
          <input
            value={formData.hero.media.alt}
            onChange={(e) => updateHeroMedia("alt", e.target.value)}
            placeholder="Alt text"
            className="w-full border rounded-lg px-4 py-3"
          />
        </div>

        <MediaUpload
          label="Hero Media File"
          value={formData.hero.media}
          onChange={(media) =>
            setFormData((prev) => ({
              ...prev,
              hero: {
                ...prev.hero,
                media: {
                  ...prev.hero.media,
                  ...media,
                },
              },
            }))
          }
        />


      </section>

      {/* =================================
          ABOUT
      ================================= */}
      <section className="rounded-xl p-6 bg-white shadow border border-gray-200">
        <h2 className="text-xl font-semibold mb-6">About Project</h2>

        <input
          value={formData.about.title}
          onChange={(e) => updateAbout("title", e.target.value)}
          placeholder="Section title"
          className="w-full border rounded-lg px-4 py-3"
        />

        <textarea
          value={formData.about.description}
          onChange={(e) => updateAbout("description", e.target.value)}
          placeholder="Long project description"
          rows={8}
          className="w-full border rounded-lg px-4 py-3 mt-5"
        />

        <div className="grid md:grid-cols-2 gap-5 mt-5 mb-5">
          <select
            value={formData.about.backgroundMedia.type}
            onChange={(e) => updateAboutMedia("type", e.target.value)}
            className="border rounded-lg px-4 py-3 w-full"
          >
            <option value="image">Image</option>
            <option value="gif">GIF</option>
            <option value="video">Video</option>
          </select>
          <input
            value={formData.about.backgroundMedia.alt}
            onChange={(e) => updateAboutMedia("alt", e.target.value)}
            placeholder="Background alt text"
            className="w-full border rounded-lg px-4 py-3"
          />
        </div>

        <MediaUpload
          label="Background Media"
          value={formData.about.backgroundMedia}
          onChange={(media) =>
            setFormData((prev) => ({
              ...prev,
              about: {
                ...prev.about,
                backgroundMedia: {
                  ...prev.about.backgroundMedia,
                  ...media,
                },
              },
            }))
          }
        />
      </section>

      {/* =================================
          SHOWCASE BUILDER
      ================================= */}
      <section className="rounded-xl p-6 bg-white shadow border border-gray-200">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h2 className="text-xl font-semibold">Showcase Builder</h2>
            <p className="text-sm text-gray-500">Add unlimited media sections.</p>
          </div>

          <button
            type="button"
            onClick={addShowcaseSection}
            className="bg-black text-white px-5 py-3 rounded-lg hover:bg-zinc-700 transition duration-300 cursor-pointer disabled:opacity-50"
          >
            + Add Section
          </button>
        </div>

        <div className="space-y-6">
          {formData.showcaseSections.map((section, sectionIndex) => (
            <div
              key={section._id || sectionIndex}
              className="border-2 rounded-xl p-5"
            >
              <div className="flex justify-between items-center mb-5">
                <h3 className="font-bold text-lg">
                  Section {sectionIndex + 1}
                </h3>

                <button
                  type="button"
                  onClick={() => removeShowcaseSection(sectionIndex)}
                  className="text-red-600"
                >
                  Remove Section
                </button>
              </div>

              <div className="grid md:grid-cols-3 gap-4 mb-5">
                <input
                  value={section.title}
                  onChange={(e) =>
                    updateSection(sectionIndex, "title", e.target.value)
                  }
                  placeholder="Section title"
                  className="border rounded-lg px-4 py-3"
                />

                <select
                  value={section.layout}
                  onChange={(e) =>
                    updateSection(sectionIndex, "layout", e.target.value)
                  }
                  className="border rounded-lg px-4 py-3"
                >
                  <option value="full">Full Width</option>
                  <option value="two-column">Two Columns</option>
                  <option value="three-column">Three Columns</option>
                  <option value="custom">Custom</option>
                </select>

                <input
                  type="number"
                  min="1"
                  max="6"
                  value={section.columns}
                  onChange={(e) =>
                    updateSection(
                      sectionIndex,
                      "columns",
                      Number(e.target.value)
                    )
                  }
                  placeholder="Columns"
                  className="border rounded-lg px-4 py-3"
                />
              </div>

              <div className="space-y-4">
                {section.items.map((item, itemIndex) => (
                  <div
                    key={item._id || itemIndex}
                    className="bg-gray-50 border rounded-lg p-4"
                  >
                    <div className="flex justify-between mb-4">
                      <h4 className="font-medium">
                        Media Box {itemIndex + 1}
                      </h4>

                      <button
                        type="button"
                        onClick={() =>
                          removeShowcaseItem(sectionIndex, itemIndex)
                        }
                        className="text-red-500"
                      >
                        Remove
                      </button>
                    </div>

                    <div className="space-y-4">
                      <div className="grid md:grid-cols-2 gap-5 mt-5 mb-5">
                        <select
                          value={item.media.type}
                          onChange={(e) =>
                            updateShowcaseMedia(
                              sectionIndex,
                              itemIndex,
                              "type",
                              e.target.value
                            )
                          }
                          className="border rounded-lg px-4 py-3 w-full"
                        >
                          <option value="image">Image</option>
                          <option value="gif">GIF</option>
                          <option value="video">Video</option>
                        </select>

                        <input
                          value={item.media.alt}
                          onChange={(e) =>
                            updateShowcaseMedia(
                              sectionIndex,
                              itemIndex,
                              "alt",
                              e.target.value
                            )
                          }
                          placeholder="Alt text"
                          className="w-full border rounded-lg px-4 py-3"
                        />
                      </div>

                      <MediaUpload
                        label={`Media Box ${itemIndex + 1}`}
                        value={item.media}
                        onChange={(media) =>
                          setFormData((prev) => {
                            const sections = [...prev.showcaseSections];
                            const currentItem =
                              sections[sectionIndex].items[itemIndex];

                            sections[sectionIndex].items[itemIndex] = {
                              ...currentItem,
                              media: {
                                ...currentItem.media,
                                ...media,
                              },
                            };

                            return {
                              ...prev,
                              showcaseSections: sections,
                            };
                          })
                        }
                      />

                      <input
                        value={item.title}
                        onChange={(e) =>
                          updateShowcaseItem(
                            sectionIndex,
                            itemIndex,
                            "title",
                            e.target.value
                          )
                        }
                        placeholder="Optional title"
                        className="w-full border rounded-lg px-4 py-3"
                      />

                      <textarea
                        value={item.description || ""}
                        onChange={(e) =>
                          updateShowcaseItem(
                            sectionIndex,
                            itemIndex,
                            "description",
                            e.target.value
                          )
                        }
                        placeholder="Optional description"
                        rows={3}
                        className="w-full border rounded-lg px-4 py-3"
                      />
                    </div>
                  </div>
                ))}
              </div>

              <button
                type="button"
                onClick={() => addShowcaseItem(sectionIndex)}
                className="mt-5 rounded-lg border px-4 py-2 text-sm font-medium transition hover:bg-black hover:text-white disabled:opacity-50 cursor-pointer"
              >
                + Add Media Box
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* =================================
          STATUS
      ================================= */}
      <section className="rounded-xl p-6 bg-white shadow border border-gray-200">
        <div className="grid md:grid-cols-2 gap-5">
          <select
            name="status"
            value={formData.status}
            onChange={handleChange}
            className="border rounded-lg px-4 py-3"
          >
            <option value="draft">Draft</option>
            <option value="published">Published</option>
          </select>

          <input
            type="number"
            name="order"
            value={formData.order}
            onChange={handleChange}
            placeholder="Display order"
            className="border rounded-lg px-4 py-3"
          />
        </div>
      </section>

      {/* =================================
          SEO
      ================================= */}
      <section className="rounded-xl p-6 bg-white shadow border border-gray-200">
        <h2 className="text-xl font-semibold mb-5">SEO</h2>

        <input
          value={formData.seo.metaTitle}
          onChange={(e) => updateSeo("metaTitle", e.target.value)}
          placeholder="Meta title"
          className="w-full border rounded-lg px-4 py-3"
        />

        <textarea
          value={formData.seo.metaDescription}
          onChange={(e) => updateSeo("metaDescription", e.target.value)}
          placeholder="Meta description"
          rows={4}
          className="w-full border rounded-lg px-4 py-3 mt-5"
        />
      </section>

      {/* =================================
          SUBMIT
      ================================= */}
      {submitText == "Update Project" ?
        (
          <div className="flex justify-end gap-4 fixed bottom-0 right-0 bg-white w-full py-4 px-6 shadow border-t border-gray-200">
            <button
              type="button"
              onClick={() =>
                router.push("/admin/projects")
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
              {saving ? "Saving..." : submitText}
            </button>
          </div>
        ) : (
          <div className="flex justify-end gap-4">
            <button
              type="button"
              onClick={() =>
                router.push("/admin/projects")
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
              {saving ? "Saving..." : submitText}
            </button>
          </div>
        )}



    </form>
  );
}
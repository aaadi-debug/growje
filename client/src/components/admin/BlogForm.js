"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import MediaUpload from "@/components/admin/MediaUpload";
import {
  createBlog,
  updateBlog,
} from "@/services/blog.service";

const emptyMedia = {
  type: "image",
  url: "",
  publicId: "",
  originalName: "",
  format: "",
  width: null,
  height: null,
  bytes: null,
  alt: "",
  poster: "",
};

const emptyBlog = {
  title: "",
  slug: "",
  excerpt: "",
  category: "Article",
  readTime: 3,

  author: {
    name: "GROWJE",
    role: "",
  },

  visualCredit: "",

  hero: {
    media: { ...emptyMedia },
  },

  content: [],

  featured: false,
  status: "draft",
  publishedAt: null,
  order: 0,

  seo: {
    metaTitle: "",
    metaDescription: "",
    ogImage: "",
  },
};

export default function BlogForm({ initialData = null, mode = "create" }) {
  const router = useRouter();

  const [form, setForm] = useState(emptyBlog);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const isEdit = mode === "edit";

  useEffect(() => {
    if (initialData) {
      setForm({
        ...emptyBlog,
        ...initialData,

        author: {
          ...emptyBlog.author,
          ...(initialData.author || {}),
        },

        hero: {
          ...emptyBlog.hero,
          ...(initialData.hero || {}),
          media: {
            ...emptyMedia,
            ...(initialData.hero?.media || {}),
          },
        },

        content: Array.isArray(initialData.content)
          ? initialData.content
          : [],

        seo: {
          ...emptyBlog.seo,
          ...(initialData.seo || {}),
        },
      });
    }
  }, [initialData]);

  const updateField = (field, value) => {
    setForm((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const updateNestedField = (parent, field, value) => {
    setForm((prev) => ({
      ...prev,
      [parent]: {
        ...prev[parent],
        [field]: value,
      },
    }));
  };

  const slugify = (value) => {
    return value
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9\s-]/g, "")
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-");
  };

  const handleTitleChange = (value) => {
    setForm((prev) => {
      const shouldUpdateSlug =
        !isEdit ||
        !prev.slug ||
        prev.slug === slugify(prev.title);

      return {
        ...prev,
        title: value,
        slug: shouldUpdateSlug ? slugify(value) : prev.slug,
      };
    });
  };

  const addContentBlock = (type) => {
    const block = {
      type,
      content: "",
      level: 2,
      items: [],
      media: undefined,
      order: form.content.length,
    };

    if (type === "image" || type === "video") {
      block.media = { ...emptyMedia };
    }

    if (type === "list") {
      block.items = [""];
    }

    setForm((prev) => ({
      ...prev,
      content: [...prev.content, block],
    }));
  };

  const updateContentBlock = (index, field, value) => {
    setForm((prev) => ({
      ...prev,
      content: prev.content.map((block, blockIndex) =>
        blockIndex === index
          ? {
            ...block,
            [field]: value,
          }
          : block
      ),
    }));
  };

  const updateContentMedia = (index, media) => {
    setForm((prev) => ({
      ...prev,
      content: prev.content.map((block, blockIndex) => {
        if (blockIndex !== index) {
          return block;
        }

        // Media removed
        if (!media?.url) {
          const updatedBlock = { ...block };
          delete updatedBlock.media;

          return updatedBlock;
        }

        // Media uploaded/updated
        return {
          ...block,
          media,
        };
      }),
    }));
  };

  const updateListItem = (blockIndex, itemIndex, value) => {
    setForm((prev) => ({
      ...prev,
      content: prev.content.map((block, index) => {
        if (index !== blockIndex) return block;

        const items = [...(block.items || [])];

        items[itemIndex] = value;

        return {
          ...block,
          items,
        };
      }),
    }));
  };

  const addListItem = (blockIndex) => {
    setForm((prev) => ({
      ...prev,
      content: prev.content.map((block, index) => {
        if (index !== blockIndex) return block;

        return {
          ...block,
          items: [...(block.items || []), ""],
        };
      }),
    }));
  };

  const removeListItem = (blockIndex, itemIndex) => {
    setForm((prev) => ({
      ...prev,
      content: prev.content.map((block, index) => {
        if (index !== blockIndex) return block;

        return {
          ...block,
          items: block.items.filter(
            (_, itemIndexToRemove) => itemIndexToRemove !== itemIndex
          ),
        };
      }),
    }));
  };

  const removeContentBlock = (index) => {
    setForm((prev) => ({
      ...prev,
      content: prev.content
        .filter((_, blockIndex) => blockIndex !== index)
        .map((block, newIndex) => ({
          ...block,
          order: newIndex,
        })),
    }));
  };

  const moveContentBlock = (index, direction) => {
    setForm((prev) => {
      const content = [...prev.content];

      const newIndex = index + direction;

      if (newIndex < 0 || newIndex >= content.length) {
        return prev;
      }

      [content[index], content[newIndex]] = [
        content[newIndex],
        content[index],
      ];

      return {
        ...prev,
        content: content.map((block, blockIndex) => ({
          ...block,
          order: blockIndex,
        })),
      };
    });
  };

  const validateForm = () => {
    if (!form.title.trim()) {
      return "Blog title is required";
    }

    if (!form.slug.trim()) {
      return "Blog slug is required";
    }

    if (!form.excerpt.trim()) {
      return "Excerpt is required";
    }

    if (!form.hero?.media?.url) {
      return "Hero media is required";
    }

    if (!form.author?.name?.trim()) {
      return "Author name is required";
    }

    return "";
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    setError("");
    setSuccess("");

    const validationError = validateForm();

    if (validationError) {
      setError(validationError);
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
      return;
    }

    setSaving(true);

    try {
      const payload = {
        ...form,

        title: form.title.trim(),
        slug: form.slug.trim().toLowerCase(),
        excerpt: form.excerpt.trim(),

        readTime: Number(form.readTime) || 1,
        order: Number(form.order) || 0,

        // content: form.content.map((block, index) => ({
        //   ...block,
        //   order: index,
        // })),
        content: form.content.map((block, index) => {
          const cleanedBlock = {
            ...block,
            order: index,
          };

          // Remove empty media objects
          if (!cleanedBlock.media?.url) {
            delete cleanedBlock.media;
          }

          return cleanedBlock;
        }),

        publishedAt:
          form.status === "published"
            ? form.publishedAt || new Date().toISOString()
            : null,
      };

      if (isEdit) {
        await updateBlog(initialData._id, payload);
        setSuccess("Blog updated successfully.");
      } else {
        await createBlog(payload);
        setSuccess("Blog created successfully.");
      }

      setTimeout(() => {
        router.push("/admin/blogs");
        router.refresh();
      }, 700);
    } catch (err) {
      console.error("Blog save error:", err);
      setError(err.message || "Failed to save blog.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {/* Messages */}
      {(error || success) && (
        <div
          className={`rounded-xl border px-4 py-3 text-sm ${error
            ? "border-red-200 bg-red-50 text-red-700"
            : "border-green-200 bg-green-50 text-green-700"
            }`}
        >
          {error || success}
        </div>
      )}

      {/* Basic Information */}
      <section className="rounded-2xl border bg-white p-6">
        <div className="mb-6">
          <h2 className="text-xl font-semibold text-gray-900">
            Basic Information
          </h2>

          <p className="mt-1 text-sm text-gray-500">
            Main information shown on the articles listing and article page.
          </p>
        </div>

        <div className="grid gap-6">
          <Field label="Title" required>
            <input
              type="text"
              value={form.title}
              onChange={(e) => handleTitleChange(e.target.value)}
              placeholder="e.g. Why brands need a stronger digital identity"
              className={inputClass}
            />
          </Field>

          <Field label="Slug" required>
            <input
              type="text"
              value={form.slug}
              onChange={(e) =>
                updateField("slug", slugify(e.target.value))
              }
              placeholder="why-brands-need-a-stronger-digital-identity"
              className={inputClass}
            />

            <p className="mt-1 text-xs text-gray-400">
              Public URL: /article/{form.slug || "your-slug"}
            </p>
          </Field>

          <Field label="Excerpt" required>
            <textarea
              value={form.excerpt}
              onChange={(e) =>
                updateField("excerpt", e.target.value)
              }
              rows={4}
              maxLength={500}
              placeholder="Short introduction shown on the article listing..."
              className={textareaClass}
            />

            <p className="mt-1 text-xs text-gray-400">
              {form.excerpt.length}/500
            </p>
          </Field>

          <div className="grid gap-6 md:grid-cols-3">
            <Field label="Category">
              <input
                type="text"
                value={form.category}
                onChange={(e) =>
                  updateField("category", e.target.value)
                }
                placeholder="Article"
                className={inputClass}
              />
            </Field>

            <Field label="Read Time (minutes)">
              <input
                type="number"
                min="1"
                value={form.readTime}
                onChange={(e) =>
                  updateField("readTime", e.target.value)
                }
                className={inputClass}
              />
            </Field>

            <Field label="Order">
              <input
                type="number"
                value={form.order}
                onChange={(e) =>
                  updateField("order", e.target.value)
                }
                className={inputClass}
              />
            </Field>
          </div>
        </div>
      </section>

      {/* Author */}
      <section className="rounded-2xl border bg-white p-6">
        <div className="mb-6">
          <h2 className="text-xl font-semibold text-gray-900">
            Author & Credits
          </h2>

          <p className="mt-1 text-sm text-gray-500">
            Credits displayed on the article page.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <Field label="Author Name">
            <input
              type="text"
              value={form.author.name}
              onChange={(e) =>
                updateNestedField(
                  "author",
                  "name",
                  e.target.value
                )
              }
              placeholder="GROWJE"
              className={inputClass}
            />
          </Field>

          <Field label="Author Role">
            <input
              type="text"
              value={form.author.role}
              onChange={(e) =>
                updateNestedField(
                  "author",
                  "role",
                  e.target.value
                )
              }
              placeholder="Creative Director"
              className={inputClass}
            />
          </Field>

          <Field label="Visual Credit">
            <input
              type="text"
              value={form.visualCredit}
              onChange={(e) =>
                updateField("visualCredit", e.target.value)
              }
              placeholder="Visuals by GROWJE"
              className={inputClass}
            />
          </Field>
        </div>
      </section>

      {/* Hero */}
      <section className="rounded-2xl border bg-white p-6">
        <div className="mb-6">
          <h2 className="text-xl font-semibold text-gray-900">
            Hero Media
          </h2>

          <p className="mt-1 text-sm text-gray-500">
            This media appears at the top of the article.
          </p>
        </div>

        <MediaUpload
          label="Hero Image / GIF / Video"
          value={form.hero.media}
          accept="image/*,.gif,.avif,.mp4,.webm,.mov"
          onChange={(media) =>
            setForm((prev) => ({
              ...prev,
              hero: {
                ...prev.hero,
                media,
              },
            }))
          }
        />

        {form.hero.media?.url && (
          <div className="mt-5 grid gap-5 md:grid-cols-2">
            <Field label="Alt Text">
              <input
                type="text"
                value={form.hero.media.alt || ""}
                onChange={(e) =>
                  setForm((prev) => ({
                    ...prev,
                    hero: {
                      ...prev.hero,
                      media: {
                        ...prev.hero.media,
                        alt: e.target.value,
                      },
                    },
                  }))
                }
                placeholder="Describe the hero media"
                className={inputClass}
              />
            </Field>

            {form.hero.media.type === "video" && (
              <Field label="Poster URL (optional)">
                <input
                  type="text"
                  value={form.hero.media.poster || ""}
                  onChange={(e) =>
                    setForm((prev) => ({
                      ...prev,
                      hero: {
                        ...prev.hero,
                        media: {
                          ...prev.hero.media,
                          poster: e.target.value,
                        },
                      },
                    }))
                  }
                  placeholder="https://..."
                  className={inputClass}
                />
              </Field>
            )}
          </div>
        )}
      </section>

      {/* Content */}
      <section className="rounded-2xl border bg-white p-6">
        <div className="mb-6">
          <h2 className="text-xl font-semibold text-gray-900">
            Article Content
          </h2>

          <p className="mt-1 text-sm text-gray-500">
            Build the article using reusable content blocks.
          </p>
        </div>

        <div className="space-y-5">
          {form.content.length === 0 && (
            <div className="rounded-xl border border-dashed p-10 text-center">
              <p className="text-sm text-gray-500">
                No content blocks yet.
              </p>

              <p className="mt-1 text-xs text-gray-400">
                Add a paragraph, heading, media, quote or list below.
              </p>
            </div>
          )}

          {form.content.map((block, index) => (
            <ContentBlock
              key={block._id || `${block.type}-${index}`}
              block={block}
              index={index}
              total={form.content.length}
              updateContentBlock={updateContentBlock}
              updateContentMedia={updateContentMedia}
              updateListItem={updateListItem}
              addListItem={addListItem}
              removeListItem={removeListItem}
              moveContentBlock={moveContentBlock}
              removeContentBlock={removeContentBlock}
            />
          ))}
        </div>

        {/* Add block buttons */}
        <div className="mt-8">
          <p className="mb-3 text-sm font-medium text-gray-700">
            Add content block
          </p>

          <div className="flex flex-wrap gap-2">
            <AddBlockButton
              label="Paragraph"
              onClick={() => addContentBlock("paragraph")}
            />

            <AddBlockButton
              label="Heading"
              onClick={() => addContentBlock("heading")}
            />

            <AddBlockButton
              label="Image / GIF"
              onClick={() => addContentBlock("image")}
            />

            <AddBlockButton
              label="Video"
              onClick={() => addContentBlock("video")}
            />

            <AddBlockButton
              label="Quote"
              onClick={() => addContentBlock("quote")}
            />

            <AddBlockButton
              label="List"
              onClick={() => addContentBlock("list")}
            />
          </div>
        </div>
      </section>

      {/* Publishing */}
      <section className="rounded-2xl border bg-white p-6">
        <div className="mb-6">
          <h2 className="text-xl font-semibold text-gray-900">
            Publishing
          </h2>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <Field label="Status">
            <select
              value={form.status}
              onChange={(e) =>
                updateField("status", e.target.value)
              }
              className={inputClass}
            >
              <option value="draft">Draft</option>
              <option value="published">Published</option>
            </select>
          </Field>

          <div className="flex items-center pt-7">
            <label className="flex cursor-pointer items-center gap-3">
              <input
                type="checkbox"
                checked={form.featured}
                onChange={(e) =>
                  updateField("featured", e.target.checked)
                }
                className="h-4 w-4"
              />

              <span className="text-sm font-medium text-gray-700">
                Featured article
              </span>
            </label>
          </div>
        </div>
      </section>

      {/* SEO */}
      <section className="rounded-2xl border bg-white p-6">
        <div className="mb-6">
          <h2 className="text-xl font-semibold text-gray-900">
            SEO
          </h2>

          <p className="mt-1 text-sm text-gray-500">
            Optional metadata for search engines and social sharing.
          </p>
        </div>

        <div className="space-y-6">
          <Field label="Meta Title">
            <input
              type="text"
              value={form.seo.metaTitle}
              onChange={(e) =>
                updateNestedField(
                  "seo",
                  "metaTitle",
                  e.target.value
                )
              }
              placeholder={form.title || "Article title"}
              className={inputClass}
            />
          </Field>

          <Field label="Meta Description">
            <textarea
              value={form.seo.metaDescription}
              onChange={(e) =>
                updateNestedField(
                  "seo",
                  "metaDescription",
                  e.target.value
                )
              }
              rows={4}
              placeholder={form.excerpt || "Article description"}
              className={textareaClass}
            />
          </Field>

          <Field label="OG Image URL">
            <input
              type="text"
              value={form.seo.ogImage}
              onChange={(e) =>
                updateNestedField(
                  "seo",
                  "ogImage",
                  e.target.value
                )
              }
              placeholder="Optional Cloudinary image URL"
              className={inputClass}
            />
          </Field>
        </div>
      </section>

      {/* Submit */}
      <div className="sticky bottom-0 z-20 -mx-4 border-t border-gray-200 bg-white/95 px-4 py-4 backdrop-blur md:-mx-6 md:px-6">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm font-medium text-gray-900">
              {isEdit ? "Update article" : "Create article"}
            </p>

            <p className="text-xs text-gray-500">
              Make sure all required fields are completed.
            </p>
          </div>

          <div className="flex gap-3">
            <button
              type="button"
              onClick={() => router.push("/admin/blogs")}
              disabled={saving}
              className="rounded-lg border px-5 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={saving}
              className="rounded-lg bg-black px-6 py-2.5 text-sm font-medium text-white hover:bg-gray-800 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {saving
                ? "Saving..."
                : isEdit
                  ? "Update Article"
                  : "Create Article"}
            </button>
          </div>
        </div>
      </div>
    </form>
  );
}

/* -------------------------------------------------------
   Content Block
------------------------------------------------------- */

function ContentBlock({
  block,
  index,
  total,
  updateContentBlock,
  updateContentMedia,
  updateListItem,
  addListItem,
  removeListItem,
  moveContentBlock,
  removeContentBlock,
}) {
  return (
    <div className="rounded-xl border bg-gray-50 p-5">
      {/* Header */}
      <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-black text-xs font-semibold text-white">
            {index + 1}
          </span>

          <div>
            <p className="text-sm font-semibold capitalize text-gray-900">
              {block.type}
            </p>

            <p className="text-xs text-gray-400">
              Content block
            </p>
          </div>
        </div>

        <div className="flex items-center gap-1">
          <button
            type="button"
            onClick={() => moveContentBlock(index, -1)}
            disabled={index === 0}
            className="rounded-lg border bg-white px-3 py-1.5 text-xs hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-30"
          >
            ↑
          </button>

          <button
            type="button"
            onClick={() => moveContentBlock(index, 1)}
            disabled={index === total - 1}
            className="rounded-lg border bg-white px-3 py-1.5 text-xs hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-30"
          >
            ↓
          </button>

          <button
            type="button"
            onClick={() => removeContentBlock(index)}
            className="ml-2 rounded-lg border border-red-200 bg-white px-3 py-1.5 text-xs text-red-600 hover:bg-red-50"
          >
            Remove
          </button>
        </div>
      </div>

      {/* Paragraph */}
      {block.type === "paragraph" && (
        <Field label="Paragraph">
          <textarea
            value={block.content || ""}
            onChange={(e) =>
              updateContentBlock(index, "content", e.target.value)
            }
            rows={6}
            placeholder="Write your paragraph..."
            className={textareaClass}
          />
        </Field>
      )}

      {/* Heading */}
      {block.type === "heading" && (
        <div className="grid gap-5 md:grid-cols-[160px_1fr]">
          <Field label="Heading Level">
            <select
              value={block.level || 2}
              onChange={(e) =>
                updateContentBlock(
                  index,
                  "level",
                  Number(e.target.value)
                )
              }
              className={inputClass}
            >
              <option value="2">H2</option>
              <option value="3">H3</option>
            </select>
          </Field>

          <Field label="Heading">
            <input
              type="text"
              value={block.content || ""}
              onChange={(e) =>
                updateContentBlock(index, "content", e.target.value)
              }
              placeholder="Section heading"
              className={inputClass}
            />
          </Field>
        </div>
      )}

      {/* Image */}
      {block.type === "image" && (
        <div className="space-y-5">
          <MediaUpload
            label="Image / GIF"
            value={block.media || emptyMedia}
            accept="image/*,.gif,.avif"
            onChange={(media) =>
              updateContentMedia(index, media)
            }
          />

          {block.media?.url && (
            <Field label="Alt Text">
              <input
                type="text"
                value={block.media.alt || ""}
                onChange={(e) =>
                  updateContentMedia(index, {
                    ...block.media,
                    alt: e.target.value,
                  })
                }
                placeholder="Describe this image"
                className={inputClass}
              />
            </Field>
          )}
        </div>
      )}

      {/* Video */}
      {block.type === "video" && (
        <div className="space-y-5">
          <MediaUpload
            label="Video"
            value={block.media || emptyMedia}
            accept=".mp4,.webm,.mov"
            onChange={(media) =>
              updateContentMedia(index, media)
            }
          />

          {block.media?.url && (
            <div className="grid gap-5 md:grid-cols-2">
              <Field label="Alt Text">
                <input
                  type="text"
                  value={block.media.alt || ""}
                  onChange={(e) =>
                    updateContentMedia(index, {
                      ...block.media,
                      alt: e.target.value,
                    })
                  }
                  placeholder="Describe the video"
                  className={inputClass}
                />
              </Field>

              <Field label="Poster URL">
                <input
                  type="text"
                  value={block.media.poster || ""}
                  onChange={(e) =>
                    updateContentMedia(index, {
                      ...block.media,
                      poster: e.target.value,
                    })
                  }
                  placeholder="Optional poster image URL"
                  className={inputClass}
                />
              </Field>
            </div>
          )}
        </div>
      )}

      {/* Quote */}
      {block.type === "quote" && (
        <Field label="Quote">
          <textarea
            value={block.content || ""}
            onChange={(e) =>
              updateContentBlock(index, "content", e.target.value)
            }
            rows={4}
            placeholder="Enter quote..."
            className={textareaClass}
          />
        </Field>
      )}

      {/* List */}
      {block.type === "list" && (
        <div>
          <p className="mb-3 text-sm font-medium text-gray-700">
            List Items
          </p>

          <div className="space-y-3">
            {(block.items || []).map((item, itemIndex) => (
              <div
                key={itemIndex}
                className="flex items-center gap-2"
              >
                <span className="text-sm text-gray-400">
                  {itemIndex + 1}.
                </span>

                <input
                  type="text"
                  value={item}
                  onChange={(e) =>
                    updateListItem(
                      index,
                      itemIndex,
                      e.target.value
                    )
                  }
                  placeholder="List item"
                  className={`${inputClass} flex-1`}
                />

                <button
                  type="button"
                  onClick={() =>
                    removeListItem(index, itemIndex)
                  }
                  disabled={block.items.length <= 1}
                  className="rounded-lg border border-red-200 px-3 py-2 text-xs text-red-600 disabled:opacity-30"
                >
                  ×
                </button>
              </div>
            ))}
          </div>

          <button
            type="button"
            onClick={() => addListItem(index)}
            className="mt-3 rounded-lg border bg-white px-4 py-2 text-xs font-medium hover:bg-gray-100"
          >
            + Add list item
          </button>
        </div>
      )}
    </div>
  );
}

/* -------------------------------------------------------
   Small Components
------------------------------------------------------- */

function Field({ label, required = false, children }) {
  return (
    <div>
      <label className="mb-2 block text-sm font-medium text-gray-700">
        {label}

        {required && (
          <span className="ml-1 text-red-500">*</span>
        )}
      </label>

      {children}
    </div>
  );
}

function AddBlockButton({ label, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="rounded-lg border bg-white px-4 py-2.5 text-sm font-medium text-gray-700 transition hover:border-gray-400 hover:bg-gray-50"
    >
      + {label}
    </button>
  );
}

const inputClass =
  "w-full rounded-lg border border-gray-300 bg-white px-3 py-2.5 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-black focus:ring-1 focus:ring-black";

const textareaClass =
  "w-full rounded-lg border border-gray-300 bg-white px-3 py-2.5 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-black focus:ring-1 focus:ring-black resize-y";
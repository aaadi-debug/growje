"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  Plus,
  Pencil,
  Trash2,
  Eye,
  FileText,
  Star,
  Search,
} from "lucide-react";

import {
  getBlogs,
  deleteBlog,
} from "@/services/blog.service";

export default function BlogsAdminPage() {
  const [blogs, setBlogs] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  const loadBlogs = async () => {
    try {
      setLoading(true);

      const data = await getBlogs();

      setBlogs(data.blogs || []);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadBlogs();
  }, []);

  const handleDelete = async (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this blog?"
    );

    if (!confirmed) return;

    try {
      await deleteBlog(id);

      setBlogs((prev) =>
        prev.filter((blog) => blog._id !== id)
      );
    } catch (error) {
      alert(error.message);
    }
  };

  const filteredBlogs = blogs.filter((blog) => {
    const value = search.toLowerCase();

    return (
      blog.title?.toLowerCase().includes(value) ||
      blog.category?.toLowerCase().includes(value)
    );
  });

  return (
    <div className="p-8">
      {/* HEADER */}
      <div className="flex items-end justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold">Blogs</h1>
          <p className="text-gray-500 text-sm">Manage articles, stories and editorial content.</p>
        </div>

        <Link
          href="/admin/blogs/new"
          className="flex gap-1 items-center bg-black text-white px-3 py-2 text-xs rounded-lg hover:bg-zinc-700 transition duration-300"
        >
          <Plus size={14} />
          New Blog
        </Link>
      </div>

      {/* STATS */}
      <div className="mb-8 grid gap-4 sm:grid-cols-3">
        {/* Start card 1 */}
        <div className="rounded-xl border bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <FileText size={20} />
            <span className="text-2xl font-semibold">
              {blogs.length}
            </span>
          </div>

          <p className="mt-3 text-sm text-neutral-500">
            Total blogs
          </p>
        </div>

        {/* Start card 2 */}
        <div className="rounded-xl border bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <Eye size={20} />

            <span className="text-2xl font-semibold">
              {
                blogs.filter(
                  (blog) =>
                    blog.status === "published"
                ).length
              }
            </span>
          </div>

          <p className="mt-3 text-sm text-neutral-500">
            Published
          </p>
        </div>

        {/* Start card 3 */}
        <div className="rounded-xl border bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <Star size={20} />

            <span className="text-2xl font-semibold">
              {
                blogs.filter(
                  (blog) => blog.featured
                ).length
              }
            </span>
          </div>

          <p className="mt-3 text-sm text-neutral-500">
            Featured
          </p>
        </div>
      </div>

      {/* SEARCH */}
      <div className="mb-6 relative">
        <Search
          size={18}
          className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
        />

        <input
          type="text"
          placeholder="Search blogs..."
          value={search}
          onChange={(e) =>
            setSearch(e.target.value)
          }
          className="w-full rounded-lg border bg-gray-50 py-3 pl-10 pr-4 text-sm outline-none transition focus:border-black focus:bg-white"
        />
      </div>

      {/* BLOGS */}
      <div className="overflow-hidden rounded-2xl border border-neutral-200 bg-white">
        {loading ? (
          <div className="p-10 text-center text-sm text-neutral-500">
            Loading blogs...
          </div>
        ) : filteredBlogs.length === 0 ? (
          <div className="p-10 text-center">
            <p className="text-sm text-neutral-500">
              No blogs found.
            </p>

            <Link
              href="/admin/blogs/new"
              className="mt-4 inline-block text-sm font-medium underline"
            >
              Create your first blog
            </Link>
          </div>
        ) : (
          <div className="divide-y divide-neutral-100">
            {filteredBlogs.map((blog) => (
              <div
                key={blog._id}
                className="flex flex-col gap-5 p-5 md:flex-row md:items-center"
              >
                {/* IMAGE */}
                <div className="h-24 w-full shrink-0 overflow-hidden rounded-xl bg-neutral-100 md:w-36">
                  {blog.hero?.media?.url && (
                    <img
                      src={blog.hero.media.url}
                      alt={blog.hero.media.alt || blog.title}
                      className="h-full w-full object-cover"
                    />
                  )}
                </div>

                {/* INFO */}
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="rounded-full bg-neutral-100 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider">
                      {blog.category}
                    </span>

                    <span
                      className={`rounded-full px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider ${blog.status === "published"
                        ? "bg-green-100 text-green-700"
                        : "bg-yellow-100 text-yellow-700"
                        }`}
                    >
                      {blog.status}
                    </span>

                    {blog.featured && (
                      <span className="flex items-center gap-1 text-[10px] font-semibold uppercase tracking-wider text-neutral-500">
                        <Star size={11} />
                        Featured
                      </span>
                    )}
                  </div>

                  <h2 className="mt-3 truncate text-lg font-semibold text-neutral-950">
                    {blog.title}
                  </h2>

                  <p className="mt-1 line-clamp-2 text-sm text-neutral-500">
                    {blog.excerpt}
                  </p>

                  <p className="mt-2 text-xs text-neutral-400">
                    {blog.readTime} min read
                  </p>
                </div>

                {/* ACTIONS */}

                <div className="flex items-center gap-2">
                  {blog.status === "published" && (
                    <Link
                      href={`/article/${blog.slug}`}
                      target="_blank"
                      className="rounded-lg border border-neutral-200 p-2.5 hover:bg-neutral-50"
                    >
                      <Eye size={16} />
                    </Link>
                  )}

                  <Link
                    href={`/admin/blogs/${blog._id}/edit`}
                    className="rounded-lg border border-neutral-200 p-2.5 hover:bg-neutral-50"
                  >
                    <Pencil size={16} />
                  </Link>

                  <button
                    onClick={() =>
                      handleDelete(blog._id)
                    }
                    className="rounded-lg border border-red-200 p-2.5 text-red-500 hover:bg-red-50"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import BlogForm from "@/components/admin/BlogForm";
import { getBlogById } from "@/services/blog.service";
import { ArrowLeft, ChevronLeft } from "lucide-react"

export default function EditBlogPage() {
  const params = useParams();
  const router = useRouter();

  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!params?.id) return;

    async function loadBlog() {
      try {
        const data = await getBlogById(params.id);

        setBlog(data.blog || data);
      } catch (err) {
        console.error("Load blog error:", err);
        setError(err.message || "Failed to load article.");
      } finally {
        setLoading(false);
      }
    }

    loadBlog();
  }, [params?.id]);

  if (loading) {
    return (
      <div className="flex min-h-[400px] items-center justify-center">
        <p className="text-sm text-gray-500">
          Loading article...
        </p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="rounded-xl border border-red-200 bg-red-50 p-5 text-sm text-red-700">
        {error}
      </div>
    );
  }

  if (!blog) {
    return (
      <div className="rounded-xl border bg-white p-5 text-sm text-gray-500">
        Article not found.
      </div>
    );
  }

  return (
    <div className="mx-auto relative p-8">
      <div className="mb-8 flex items-start justify-start gap-4">
        <button
          type="button"
          onClick={() => router.push("/admin/blogs")}
          title="Back to Services"
          className="bg-black text-white p-2 rounded-full hover:bg-zinc-700 transition duration-300 cursor-pointer"
        >
          {/* <ArrowLeft size={16} /> */}
          <ChevronLeft size={16} />
        </button>
        <div>
          <h1 className="text-2xl font-bold">Edit Article</h1>
          <p className="text-gray-500 text-sm"> Update your editorial article.</p>
        </div>
      </div>

      <BlogForm initialData={blog} mode="edit" />
    </div>
  );
}
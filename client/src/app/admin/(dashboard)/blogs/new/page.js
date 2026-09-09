"use client";

import { useRouter } from "next/navigation";
import { ArrowLeft, ChevronLeft } from "lucide-react"

import BlogForm from "@/components/admin/BlogForm";

export default function NewBlogPage() {
  const router = useRouter();

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
          <h1 className="text-2xl font-bold">New Article</h1>
          <p className="text-gray-500 text-sm">Create a new editorial article for the GROWJE website.</p>
        </div>
      </div>

      <BlogForm />
    </div>
  );
}
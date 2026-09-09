"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

import { getBlogBySlug } from "@/services/blog.service";

export default function ArticlePage() {
  const params = useParams();

  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadBlog = async () => {
      try {
        const data = await getBlogBySlug(params.slug);
        setBlog(data.blog);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    if (params.slug) {
      loadBlog();
    }
  }, [params.slug]);

  if (loading) {
    return (
      <main className="flex min-h-screen items-center justify-center">
        Loading article...
      </main>
    );
  }

  if (!blog) {
    return (
      <main className="flex min-h-screen items-center justify-center">
        Article not found.
      </main>
    );
  }

  const heroMedia = blog.hero?.media;

  return (
    <main className="bg-[#f7f6f2] text-black">
      {/* DESKTOP SPLIT LAYOUT */}
      <div className="lg:grid lg:grid-cols-2">
        {/* LEFT - FIXED HERO IMAGE */}
        <aside className="hidden lg:block">
          <div className="sticky top-0 h-screen w-full">
            {heroMedia?.url && (
              <>
                {heroMedia.type === "video" ? (
                  <video
                    src={heroMedia.url}
                    poster={heroMedia.poster || undefined}
                    autoPlay
                    muted
                    loop
                    playsInline
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <img
                    src={heroMedia.url}
                    alt={heroMedia.alt || blog.title}
                    className="h-full w-full object-cover"
                  />
                )}
              </>
            )}
          </div>
        </aside>

        {/* RIGHT - SCROLLING CONTENT */}
        <div>
          {/* HERO / TITLE */}
          <section className="px-6 pb-16 pt-32 md:px-10 lg:px-12 lg:pt-32">
            <div className="mx-auto max-w-3xl">
              <div className="mb-10 flex flex-wrap items-center gap-4 text-[10px] font-semibold uppercase tracking-[0.2em] text-neutral-500">
                <span>{blog.category}</span>

                <span>•</span>

                <span>{blog.readTime} min read</span>
              </div>

              <h1 className="text-5xl max-sm:text-4xl font-medium leading-[0.92] tracking-[-0.05em] md:text-7xl lg:text-[3rem] xl:text-[5rem] 2xl:text-[5.5rem]">
                {blog.title}
              </h1>

              {blog.excerpt && (
                <p className="mt-10 max-w-2xl text-lg max-sm:text-base leading-8 text-neutral-600 md:text-2xl md:leading-9">
                  {blog.excerpt}
                </p>
              )}
            </div>
          </section>

          {/* MOBILE HERO IMAGE */}
          <section className="block px-0 md:px-6 lg:hidden">
            <div className="mx-auto overflow-hidden">
              {heroMedia?.url && (
                <>
                  {heroMedia.type === "video" ? (
                    <video
                      src={heroMedia.url}
                      poster={heroMedia.poster || undefined}
                      controls
                      playsInline
                      className="h-auto w-full object-cover"
                    />
                  ) : (
                    <img
                      src={heroMedia.url}
                      alt={heroMedia.alt || blog.title}
                      className="h-auto w-full object-cover"
                    />
                  )}
                </>
              )}
            </div>
          </section>

          {/* CREDITS */}
          <section className="border-b border-black px-6 py-10 md:px-10 lg:px-12">
            <div className="mx-auto grid max-w-3xl grid-cols-2 gap-8 md:grid-cols-4">
              <div>
                <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-neutral-500">
                  Words by
                </p>

                <p className="mt-2 text-sm">
                  {blog.author?.name}
                </p>
              </div>

              <div>
                <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-neutral-500">
                  Role
                </p>

                <p className="mt-2 text-sm">
                  {blog.author?.role || "GROWJE"}
                </p>
              </div>

              {blog.visualCredit && (
                <div>
                  <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-neutral-500">
                    Visuals by
                  </p>

                  <p className="mt-2 text-sm">
                    {blog.visualCredit}
                  </p>
                </div>
              )}

              <div>
                <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-neutral-500">
                  Published
                </p>

                <p className="mt-2 text-sm">
                  {blog.publishedAt
                    ? new Date(
                        blog.publishedAt
                      ).toLocaleDateString("en-IN", {
                        day: "2-digit",
                        month: "long",
                        year: "numeric",
                      })
                    : ""}
                </p>
              </div>
            </div>
          </section>

          {/* ARTICLE */}
          <article className="px-6 py-10 md:px-10 md:py-28 lg:px-12 lg:py-24">
            <div className="mx-auto max-w-3xl">
              {blog.content?.map((block, index) => (
                <ArticleBlock
                  key={block._id || index}
                  block={block}
                />
              ))}
            </div>
          </article>

          {/* BACK */}
          <section className="border-t border-black px-6 py-16 md:px-10 lg:px-12">
            <div className="mx-auto max-w-3xl">
              <a
                href="/articles"
                className="text-sm font-semibold uppercase tracking-[0.15em]"
              >
                ← All articles
              </a>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}

function ArticleBlock({ block }) {
  switch (block.type) {
    case "paragraph":
      return (
        <p className="mb-8 text-lg max-sm:text-base max-sm:leading-normal leading-8 text-neutral-800 md:text-xl md:leading-9">
          {block.content}
        </p>
      );

    case "heading":
      return (
        <div className="mb-8 mt-16">
          {block.level === 3 ? (
            <h3 className="text-2xl font-medium md:text-3xl">
              {block.content}
            </h3>
          ) : (
            <h2 className="text-3xl font-medium tracking-tight md:text-5xl">
              {block.content}
            </h2>
          )}
        </div>
      );

    case "quote":
      return (
        <blockquote className="my-14 border-l-2 border-black pl-6 text-2xl font-medium leading-tight md:text-4xl">
          {block.content}
        </blockquote>
      );

    case "image":
      return (
        <figure className="my-14">
          {block.media?.url && (
            <img
              src={block.media.url}
              alt={block.media.alt || ""}
              className="w-full"
            />
          )}
        </figure>
      );

    case "video":
      return (
        <div className="my-14 overflow-hidden">
          {block.media?.url && (
            <video
              src={block.media.url}
              poster={block.media.poster || undefined}
              controls
              playsInline
              className="w-full"
            />
          )}
        </div>
      );

    case "list":
      return (
        <ul className="my-10 list-disc space-y-3 pl-6 text-lg leading-8">
          {block.items?.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
      );

    default:
      return null;
  }
}
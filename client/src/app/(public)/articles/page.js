"use client";

import { useEffect, useState, useRef } from "react";
import Link from "next/link";

import { getPublishedBlogs } from "@/services/blog.service";

function FadeUp({ children, delay = 0, className = "" }) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.12 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`transition-all duration-1000 ease-out ${
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
      } ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}

function RotatingBadge() {
  return (
    <div className="relative w-36 h-36 lg:w-44 lg:h-44">
      {/* Rotating text */}
      <div className="absolute inset-0 animate-[spin_12s_linear_infinite]">
        <svg viewBox="0 0 200 200" className="w-full h-full">
          <defs>
            <path
              id="circlePath"
              d="M 100, 100 m -75, 0 a 75,75 0 1,1 150,0 a 75,75 0 1,1 -150,0"
            />
          </defs>
          <text className="text-xl tracking-[0.25em] fill-white/90">
            <textPath href="#circlePath" startOffset="0%">
              Latest Articles • Latest Articles •
            </textPath>
          </text>
        </svg>
      </div>

      {/* Center arrow */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-12 h-12 rounded-full border border-white/40 flex items-center justify-center bg-white/10 backdrop-blur-sm">
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="white"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M7 17L17 7" />
            <path d="M7 7h10v10" />
          </svg>
        </div>
      </div>
    </div>
  );
}

export default function ArticlesPage() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadBlogs = async () => {
      try {
        const data = await getPublishedBlogs();
        setBlogs(data.blogs || []);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    loadBlogs();
  }, []);

  return (
    <main className="bg-[#f7f6f2] text-black">
      {/* HERO */}
      <section className="relative overflow-hidden min-h-screen flex lg:flex-row flex-col lg:justify-between justify-end 2xl:pb-16 xl:pb-10 pb-8">
        {/* Soft background glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-white/[0.03] rounded-full blur-[100px] pointer-events-none" />

        {/* Background image */}
        <div
          className="absolute inset-0 bg-top bg-no-repeat bg-cover"
          style={{
            backgroundImage: "url('assets/images/blogs_hero_bg.png')",
          }}
        />

        <div className="absolute inset-0 bg-gradient-to-t from-[#08689A]/90 via-[#08689A]/50 to-transparent" />

        {/* left */}
        <div className="relative flex flex-col justify-end lg:px-12 px-6">
          <FadeUp className="mb-4">
            <RotatingBadge />
          </FadeUp>
          <FadeUp>
            <p className="mb-5 text-xs uppercase tracking-[0.25em] text-white/75">
              GROWJE JOURNAL
            </p>
          </FadeUp>

          <FadeUp delay={100}>
            <h1 className="text-[clamp(2.5rem,6vw,6.8rem)] font-medium leading-[0.92] tracking-[-0.06em] text-white">
              Ideas
              <br />
              <span className="text-white/75"> Insights & Stories</span>
            </h1>
          </FadeUp>
        </div>
      </section>

      {/* ARTICLES */}
      <section className="relative overflow-hidden px-6 lg:px-10 py-16 lg:py-20">
        <div
          className="pointer-events-none absolute -right-20 top-10 h-72 w-72 rounded-full bg-orange-300/30 blur-3xl"
          aria-hidden="true"
        />
        <div
          className="pointer-events-none absolute -left-16 bottom-10 h-80 w-80 rounded-full bg-teal-300/25 blur-3xl"
          aria-hidden="true"
        />

        {/* Optional light grid */}
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.65]
                    [background-image:linear-gradient(to_right,rgba(0,0,0,0.06)_1px,transparent_1px),linear-gradient(to_bottom,rgba(0,0,0,0.06)_1px,transparent_1px)]
                    [background-size:48px_48px]"
          aria-hidden="true"
        />

        <div className="mx-auto max-w-[1600px]">
          {loading ? (
            <div className="p-10 text-center h-20">Loading articles...</div>
          ) : blogs.length === 0 ? (
            <div className="flex min-h-[40vh] flex-col items-center justify-center text-center px-6">
              <h3 className="text-xl font-medium text-gray-700 mb-2">
                No articles yet
              </h3>
              <p className="text-gray-500 text-sm max-w-sm">
                We’re working on new insights and stories. Check back soon.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              {blogs.map((blog) => (
                <Link
                  href={`/article/${blog.slug}`}
                  key={blog._id}
                  className="group flex flex-col overflow-hidden rounded-2xl border border-black/10 bg-white transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:border-black/20"
                >
                  {/* IMAGE */}
                  <div className="aspect-[4/3] overflow-hidden bg-neutral-200">
                    {blog.hero?.media?.url && (
                      <img
                        src={blog.hero.media.url}
                        alt={blog.hero.media.alt || blog.title}
                        className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
                      />
                    )}
                  </div>

                  {/* CONTENT */}
                  <div className="flex flex-1 flex-col p-6 md:p-7">
                    <div className="flex flex-wrap gap-3 text-[10px] font-semibold uppercase tracking-[0.2em] text-black/60">
                      <span>{blog.category}</span>
                      <span>{blog.readTime} min read</span>
                    </div>

                    <h2 className="mt-4 text-xl font-medium leading-tight tracking-[-0.02em] md:text-2xl group-hover:text-[#08689A] transition-colors">
                      {blog.title}
                    </h2>

                    {blog.excerpt && (
                      <p className="mt-3 line-clamp-3 text-sm leading-relaxed text-black/60">
                        {blog.excerpt}
                      </p>
                    )}

                    {/* ARROW */}
                    {/* <div className="mt-auto pt-5 text-xl opacity-60 transition-all group-hover:translate-x-1 group-hover:opacity-100">
                      ↗
                    </div> */}
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
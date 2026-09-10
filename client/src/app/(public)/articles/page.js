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
      className={`transition-all duration-1000 ease-out ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
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
  const [loading, setLoading] =
    useState(true);

  useEffect(() => {
    const loadBlogs = async () => {
      try {
        const data =
          await getPublishedBlogs();

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
      <section className="relative overflow-hidden min-h-screen flex lg:flex-row flex-col lg:justify-between justify-end lg:pb-20 pb-10">
        {/* Soft background glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-white/[0.03] rounded-full blur-[100px] pointer-events-none" />

        {/* Background image */}
        <div
          className="absolute inset-0 bg-top bg-no-repeat bg-cover"
          style={{
            backgroundImage: "url('assets/images/blogs_hero_bg.png')", // ← change to your actual filename
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
      <section className="relative overflow-hidden px-6 lg:px-10 py-16 lg:py-28">
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
            <div className="p-10">
              Loading articles...
            </div>
          ) : blogs.length === 0 ? (
            <div className="flex min-h-[40vh] flex-col items-center justify-center text-center px-6">
              <p className="text-xs uppercase tracking-[0.2em] text-black/40 mb-4">
                Journal
              </p>
              <h2 className="text-3xl md:text-5xl font-medium tracking-tight mb-4">
                No articles yet
              </h2>
              <p className="max-w-md text-black/50 leading-relaxed">
                We’re working on new insights and stories. Check back soon.
              </p>
            </div>
          ) : (
            blogs.map((blog, index) => (
              <Link
                href={`/article/${blog.slug}`}
                key={blog._id}
                className="group block border-b border-black px-6 py-10 transition-colors hover:bg-black hover:text-white md:px-10 md:py-14 lg:px-16"
              >
                <div className="grid gap-8 md:grid-cols-[1fr_2fr_auto] md:items-center">
                  {/* IMAGE */}
                  <div className="aspect-[4/3] overflow-hidden bg-neutral-200">
                    {blog.hero?.media?.url && (
                      <img
                        src={
                          blog.hero.media.url
                        }
                        alt={
                          blog.hero.media.alt ||
                          blog.title
                        }
                        className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
                      />
                    )}
                  </div>

                  {/* CONTENT */}

                  <div>
                    <div className="flex flex-wrap gap-4 text-[10px] font-semibold uppercase tracking-[0.2em]">
                      <span>
                        {blog.category}
                      </span>

                      <span>
                        {blog.readTime} min read
                      </span>
                    </div>

                    <h2 className="mt-5 max-w-4xl text-3xl font-medium leading-[1] tracking-[-0.03em] md:text-5xl lg:text-6xl">
                      {blog.title}
                    </h2>

                    {blog.excerpt && (
                      <p className="mt-5 max-w-2xl text-sm leading-6 opacity-60">
                        {blog.excerpt}
                      </p>
                    )}
                  </div>

                  {/* ARROW */}

                  <div className="text-3xl transition-transform group-hover:translate-x-2">
                    ↗
                  </div>
                </div>
              </Link>
            ))
          )}
        </div>
      </section>
    </main>
  );
}
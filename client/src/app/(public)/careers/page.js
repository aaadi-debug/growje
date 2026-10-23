"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { MapPin, Briefcase, ArrowUpRight } from "lucide-react";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export default function CareersPage() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const res = await fetch(`${API_URL}/jobs/public`);
        const data = await res.json();
        if (data.success) setJobs(data.jobs || []);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchJobs();
  }, []);

  return (
    <main className="bg-white text-black">
      {/* ================= HERO ================= */}
      <section className="relative overflow-hidden min-h-screen flex lg:flex-row flex-col lg:justify-between justify-end 2xl:pb-16 xl:pb-10 pb-8">
        {/* Soft background glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-white/[0.03] rounded-full blur-[100px] pointer-events-none" />

        {/* Background image */}
        <div
          className="absolute inset-0 bg-top bg-no-repeat"
          style={{
            backgroundImage: "url('assets/images/careers_hero_bg.png')", // ← change to your actual filename
          }}
        />

        <div className="absolute inset-0 bg-gradient-to-t from-[#08689A]/90 via-[#08689A]/50 to-transparent" />

        {/* left */}
        <div className="relative flex flex-col justify-end lg:px-12 px-6">
          <div>
            <p className="mb-5 text-xs uppercase tracking-[0.25em] text-white/75">
              GROWJE Careers
            </p>
          </div>

          <div delay={100}>
            <h1 className="2xl:text-[clamp(2.5rem,6vw,6.8rem)] xl:text-[clamp(1.5rem,6vw,4rem)] lg:text-[clamp(1.5rem,4vw,4rem)] text-[clamp(1.5rem,6vw,4rem)] font-medium leading-[0.92] tracking-[-0.06em] text-white">
              We build brands
              <br />
              <span className="text-white/75">people remember.</span>
            </h1>

            <Link
              href="/contact-us"
              className="
                                group
                                inline-flex
                                items-center
                                text-white
                                gap-3
                                mt-10
                                text-sm
                                font-medium
                                border-b
                                border-white
                                pb-2
                                relative
                                after:absolute
                                after:bottom-0
                                after:left-0
                                after:h-px
                                after:w-0
                                after:bg-primary
                                after:transition-all
                                after:duration-300
                                hover:after:w-full
                                hover:text-white/80 hover:border-white/80
                            "
            >
              Find Your Job
              <ArrowUpRight
                size={16}
                className="transition-all duration-300 ease-out group-hover:rotate-45 group-hover:translate-x-1"
              />
            </Link>
          </div>
        </div>

        {/* right */}
        {/* <div className="relative flex flex-col justify-end lg:px-16 px-6 max-sm:hidden">
          <div delay={200}>
            <p className="mt-10 max-sm:mt-6 max-w-xl 2xl:text-xl xl:text-xl text-lg max-sm:text-base lg:font-semibold leading-relaxed text-white">
              A creative digital agency focused on strategy, design and
              technology that helps ambitious brands grow and stand out.
            </p>
          </div>
        </div> */}
      </section>

      {/* Jobs */}
      <section className="relative overflow-clip px-6 lg:px-10 lg:py-16 md:py-12 py-6">
        {/* Background blurs */}
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

        <div className="relative mx-auto">
          <h2 className="text-3xl lg:text-5xl md:text-4xl tracking-[-0.06em] leading-none mb-10 text-center">
            Open Positions
          </h2>

          {loading ? (
            <p className="text-gray-500">Loading...</p>
          ) : jobs.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-xl text-gray-600 mb-2">No open positions right now</p>
              <p className="text-gray-500 text-sm">
                Check back soon, or send your resume to{" "}
                <a href="mailto:support@growje.com" className="underline">
                  support@growje.com
                </a>
              </p>
            </div>
          ) : (
            <div className="space-y-4 grid lg:grid-cols-2 grid-cols-1 gap-4">
              {jobs.map((job) => (
                <Link
                  key={job._id}
                  href={`/careers/${job.slug}`}
                  target="_blank"
                  className="group flex flex-col md:flex-row md:items-center justify-between gap-4 border border-black/10 rounded-2xl p-6 hover:border-primary hover:bg-primary/5 transition"
                >
                  <div>
                    <h3 className="text-xl font-medium group-hover:text-primary transition">
                      {job.title}
                    </h3>
                    <div className="flex flex-wrap gap-4 mt-2 text-sm text-black/50">
                      {job.department && (
                        <span className="flex items-center gap-1.5">
                          <Briefcase size={14} />
                          {job.department}
                        </span>
                      )}
                      <span className="flex items-center gap-1.5">
                        <MapPin size={14} />
                        {job.location}
                      </span>
                      <span className="capitalize">{job.employmentType}</span>
                    </div>
                    {job.shortDescription && (
                      <p className="mt-3 text-sm text-black/60 line-clamp-2">
                        {job.shortDescription}
                      </p>
                    )}
                  </div>
                  <span className="shrink-0 w-10 h-10 rounded-full border border-black/20 flex items-center justify-center group-hover:bg-primary group-hover:text-white group-hover:border-primary transition">
                    <ArrowUpRight size={18} />
                  </span>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
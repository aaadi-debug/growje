"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { MapPin, Briefcase, ArrowLeft } from "lucide-react";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export default function JobDetailPage() {
  const { slug } = useParams();
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!slug) return;
    const fetchJob = async () => {
      try {
        const res = await fetch(`${API_URL}/jobs/slug/${slug}`);
        const data = await res.json();
        if (data.success) setJob(data.job);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchJob();
  }, [slug]);

  if (loading) return <div className="p-20 text-center">Loading...</div>;
  if (!job) {
    return (
      <div className="p-20 text-center">
        <p className="text-xl mb-4">Job not found</p>
        <Link href="/careers" className="underline">
          Back to careers
        </Link>
      </div>
    );
  }

  return (
    <main className="bg-white text-black">
      {/* ================= HERO ================= */}
      <section className="relative overflow-hidden lg:h-[60vh] md:h-[50vh] h-[40vh] flex lg:flex-row flex-col lg:justify-between justify-end 2xl:pb-16 xl:pb-10 pb-8">
        {/* Soft background glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-white/[0.03] rounded-full blur-[100px] pointer-events-none" />

        {/* Background image */}
        <div
          className="absolute inset-0 bg-top bg-no-repeat"
          style={{
            backgroundImage: "url('/assets/images/careers_hero_bg.png')", // ← change to your actual filename
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
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden bg-white px-6 lg:px-10 lg:py-16 md:py-12 py-6">
        {/* Soft background blobs */}
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
          <Link
            href="/careers"
            className="inline-flex items-center gap-2 text-sm text-black/50 hover:text-black mb-10"
          >
            <ArrowLeft size={16} />
            All positions
          </Link>

          <h1 className="text-4xl md:text-5xl font-medium tracking-tight">
            {job.title}
          </h1>

          <div className="flex flex-wrap gap-4 mt-4 text-sm text-black/50">
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

          {job.description && (
            <div className="mt-10">
              <h2 className="text-lg font-medium mb-3">About the role</h2>
              <p className="text-black/70 leading-relaxed whitespace-pre-line">
                {job.description}
              </p>
            </div>
          )}

          {job.responsibilities?.length > 0 && (
            <div className="mt-10">
              <h2 className="text-lg font-medium mb-3">Responsibilities</h2>
              <ul className="space-y-2">
                {job.responsibilities.map((item, i) => (
                  <li key={i} className="flex gap-3 text-black/70">
                    <span className="text-primary mt-1">✓</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {job.requirements?.length > 0 && (
            <div className="mt-10">
              <h2 className="text-lg font-medium mb-3">Requirements</h2>
              <ul className="space-y-2">
                {job.requirements.map((item, i) => (
                  <li key={i} className="flex gap-3 text-black/70">
                    <span className="text-primary mt-1">✓</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          )}

          <div className="mt-12 pt-8 border-t">
            <a
              href={`mailto:${job.applyEmail}?subject=Application: ${job.title}`}
              className="inline-flex items-center gap-2 bg-primary text-white px-6 py-3.5 rounded-lg font-medium hover:bg-black transition"
            >
              Apply now
            </a>
            <p className="mt-3 text-sm text-black/50">
              Or email your resume to {job.applyEmail}
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
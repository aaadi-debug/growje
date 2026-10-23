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
      <section className="px-6 lg:px-10 py-12 lg:py-20 max-w-3xl mx-auto">
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
      </section>
    </main>
  );
}
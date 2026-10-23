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
      {/* Hero */}
      <section className="px-6 lg:px-10 py-20 lg:py-32 bg-black text-white">
        <h1 className="text-5xl md:text-7xl font-medium tracking-tight">
          Careers
        </h1>
        <p className="mt-6 text-xl text-white/70 max-w-2xl">
          Join GROWJE and help build brands people remember. Explore open roles
          below.
        </p>
      </section>

      {/* Jobs */}
      <section className="px-6 lg:px-10 py-16 lg:py-24">
        <h2 className="text-3xl md:text-5xl font-medium mb-12">
          Open Positions
        </h2>

        {loading ? (
          <p className="text-gray-500">Loading...</p>
        ) : jobs.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-xl text-gray-600 mb-2">No open positions right now</p>
            <p className="text-gray-500 text-sm">
              Check back soon, or send your resume to{" "}
              <a href="mailto:careers@growje.com" className="underline">
                careers@growje.com
              </a>
            </p>
          </div>
        ) : (
          <div className="space-y-4 max-w-4xl">
            {jobs.map((job) => (
              <Link
                key={job._id}
                href={`/careers/${job.slug}`}
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
      </section>
    </main>
  );
}
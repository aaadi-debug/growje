// client/src/components/public/ServicePage.jsx

import Link from "next/link";
import MediaRenderer from "./MediaRenderer";
import ClientMarquee from "./ClientMarquee";
import ProjectCard from "./ProjectCard";

export default function ServicePage({
  service,
  projects = [],
}) {
  if (!service) {
    return null;
  }

  return (
    <main className="bg-white text-black">

      {/* ==============================
          HERO
      ============================== */}
      <section className="relative min-h-screen overflow-hidden bg-black text-white">
        {service.hero?.media?.url && (
          <MediaRenderer
            media={service.hero.media}
            priority
            className="absolute inset-0 h-full w-full object-cover"
          />
        )}

        <div className="absolute inset-0" />

        <div className="relative z-10 flex min-h-screen items-end px-5 pb-10 md:px-10 lg:px-16 lg:pb-16">

          {/* <div className="max-w-7xl">
            <p className="mb-5 text-xs uppercase tracking-[0.2em] text-white/60">
              GROWJE
            </p>

            <h1 className="max-w-6xl text-3xl font-medium leading-[0.92] md:text-5xl lg:text-[5vw]">
              {service.hero?.title ||
                service.title}
            </h1>

            {service.shortDescription && (
              <p className="mt-8 max-w-2xl text-base leading-7 text-white/80 md:text-lg">
                {service.shortDescription}
              </p>
            )}
          </div> */}
        </div>
      </section>


      {/* ==============================
          CLIENT MARQUEE
      ============================== */}
      <ClientMarquee
        clients={service.clients}
      />


      {/* ==============================
          SERVICE INTRO
      ============================== */}
      <section className="relative overflow-hidden px-5 py-24 md:py-32 flex justify-center bg-white">
        {/* Soft blobs */}
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

        <h2 className="relative z-10 max-w-5xl text-center text-3xl font-medium leading-tight md:text-5xl lg:text-6xl">
          {service.shortDescription || service.title}
        </h2>
      </section>


      {/* ==============================
          PORTFOLIO
      ============================== */}
      {projects.length > 0 && (
        <section className="px-5 pb-24 pt-20 md:px-10 lg:px-32 bg-primary/10 relative overflow-hidden">
          {/* Soft blobs */}
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

          <div className="mb-12 flex flex-col justify-between gap-5 md:flex-row md:items-end">
            <div>
              {service.portfolioSubtitle && (
                <p className="mb-3 text-xs uppercase tracking-[0.2em] text-black/40">
                  {service.portfolioSubtitle}
                </p>
              )}

              <h2 className="text-4xl font-bold md:text-6xl text-primary">
                {service.portfolioTitle ||
                  "PORTFOLIO"}
              </h2>

            </div>
          </div>


          <div className="grid gap-x-12 gap-y-16 lg:grid-cols-3 md:grid-cols-2 grid-cols-2">

            {projects.map((project) => (
              <ProjectCard
                key={project._id}
                project={project}
              />
            ))}

          </div>

        </section>
      )}


      {/* ==============================
          CTA
      ============================== */}

      <section className="bg-black px-5 py-24 text-white md:px-10 md:py-32 lg:px-16">

        <div className="max-w-6xl">

          <p className="mb-5 text-xs uppercase tracking-[0.2em] text-white/50">
            Let's work together
          </p>

          <h2 className="max-w-5xl text-4xl font-medium leading-tight md:text-6xl lg:text-8xl">
            Have a project in mind?
          </h2>

          <Link
            href="/contact"
            className="mt-10 inline-flex items-center gap-4 border-b border-white pb-2 text-lg transition-opacity hover:opacity-60"
          >
            Start a conversation
            <span>↗</span>
          </Link>

        </div>

      </section>

    </main>
  );
}
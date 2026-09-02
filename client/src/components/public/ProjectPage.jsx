// client/src/components/public/ProjectPage.jsx

import Link from "next/link";
import MediaRenderer from "./MediaRenderer";
import ShowcaseSection from "./ShowcaseSection";

export default function ProjectPage({ project }) {
  if (!project) {
    return null;
  }

  const showcaseSections = [
    ...(project.showcaseSections || []),
  ].sort(
    (a, b) => (a.order || 0) - (b.order || 0)
  );

  return (
    <main className="bg-white text-black">

      {/* ==============================
          HERO
      ============================== */}

      <section className="relative min-h-[75vh] overflow-hidden bg-black text-white">

        {project.hero?.media?.url && (
          <MediaRenderer
            media={project.hero.media}
            priority
            className="absolute inset-0 h-full w-full object-cover"
          />
        )}

        <div className="absolute inset-0 bg-black/35" />

        <div className="relative z-10 flex min-h-[75vh] items-end px-5 pb-10 md:px-10 lg:px-16 lg:pb-16">
          <div className="max-w-6xl">

            {project.category && (
              <p className="mb-5 text-xs uppercase tracking-[0.2em] text-white/70">
                {project.category}
              </p>
            )}

            <h1 className="max-w-5xl text-4xl font-medium leading-[0.95] md:text-6xl lg:text-8xl">
              {project.title}
            </h1>

            {project.shortDescription && (
              <p className="mt-6 max-w-2xl text-base leading-7 text-white/80 md:text-lg">
                {project.shortDescription}
              </p>
            )}

          </div>
        </div>
      </section>


      {/* ==============================
          PROJECT INFORMATION
      ============================== */}

      <section className="grid gap-12 px-5 py-16 md:grid-cols-2 md:px-10 lg:grid-cols-4 lg:px-16">

        {project.clientName && (
          <div>
            <p className="mb-3 text-xs uppercase tracking-widest text-black/40">
              Client
            </p>

            <p className="text-lg">
              {project.clientName}
            </p>
          </div>
        )}

        {project.category && (
          <div>
            <p className="mb-3 text-xs uppercase tracking-widest text-black/40">
              Category
            </p>

            <p className="text-lg">
              {project.category}
            </p>
          </div>
        )}

        {project.services?.length > 0 && (
          <div>
            <p className="mb-3 text-xs uppercase tracking-widest text-black/40">
              Services
            </p>

            <div className="space-y-1">
              {project.services.map((service) => (
                <Link
                  key={service._id}
                  href={`/${service.slug}`}
                  className="block text-lg hover:underline"
                >
                  {service.title}
                </Link>
              ))}
            </div>
          </div>
        )}

        {project.workedOn?.length > 0 && (
          <div>
            <p className="mb-3 text-xs uppercase tracking-widest text-black/40">
              Worked on
            </p>

            <div className="space-y-1">
              {project.workedOn.map(
                (item, index) => (
                  <p key={`${item}-${index}`}>
                    {item}
                  </p>
                )
              )}
            </div>
          </div>
        )}

      </section>


      {/* ==============================
          ABOUT
      ============================== */}

      {project.about && (
        <section className="relative overflow-hidden bg-zinc-100">

          {project.about.backgroundMedia?.url && (
            <MediaRenderer
              media={project.about.backgroundMedia}
              className="absolute inset-0 h-full w-full object-cover"
            />
          )}

          <div className="absolute inset-0 bg-black/20" />

          <div className="relative z-10 px-5 py-24 md:px-10 md:py-32 lg:px-16 lg:py-40">

            <div className="max-w-6xl">

              {project.about.title && (
                <h2 className="max-w-4xl text-4xl font-medium leading-tight md:text-6xl lg:text-7xl">
                  {project.about.title}
                </h2>
              )}

              {project.about.description && (
                <p className="mt-10 max-w-3xl whitespace-pre-line text-base leading-8 md:text-lg">
                  {project.about.description}
                </p>
              )}

            </div>

          </div>
        </section>
      )}


      {/* ==============================
          SHOWCASE
      ============================== */}

      <div>
        {showcaseSections.map(
          (section, index) => (
            <ShowcaseSection
              key={
                section._id ||
                `showcase-${index}`
              }
              section={section}
            />
          )
        )}
      </div>


      {/* ==============================
          BACK TO PORTFOLIO
      ============================== */}

      <section className="px-5 py-24 md:px-10 lg:px-16">

        <Link
          href="/portfolio"
          className="group inline-flex items-center gap-4 text-2xl font-medium md:text-4xl"
        >
          <span className="transition-transform duration-300 group-hover:-translate-x-2">
            ←
          </span>

          <span>
            Back to portfolio
          </span>
        </Link>

      </section>

    </main>
  );
}
// client/src/components/public/ProjectPage.jsx

import Link from "next/link";
import MediaRenderer from "./MediaRenderer";
import ShowcaseSection from "./ShowcaseSection";
// import RelatedProjects from "./RelatedProjects";

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
      <section className="relative lg:h-screen  overflow-hidden text-white" style={{ backgroundColor: project.cardColor || "#2d2d2d" }}>
        <div className="grid h-full lg:grid-cols-2">

          {/* Left side - Media */}
          <div className="relative h-full min-h-[50vh] lg:min-h-full md:min-h-[80vh] lg:order-1 order-2 max-sm:px-6 max-sm:pb-16">
            {project.hero?.media?.url && (
              <MediaRenderer
                media={project.hero.media}
                priority
                className="h-full w-full lg:object-cover md:object-contain"
              />
            )}
          </div>

          {/* Right side - Content */}
          <div className="relative z-10 flex h-full items-end px-8 pb-10 md:px-10 lg:px-16 lg:pb-16 lg:order-2 order-1 lg:pt-0 md:pt-28 max-sm:pt-32">
            <div className="max-w-6xl">
              <h1 className="max-w-5xl 2xl:text-3xl xl:text-3xl lg:text-2xl md:text-2xl text-xl font-medium leading-[0.95] text-white/80">
                {project.title}
              </h1>

              {/* Short Description */}
              {project.shortDescription && (
                <p className="my-6 max-w-2xl 2xl:text-5xl xl:text-5xl lg:text-3xl md:text-3xl text-2xl text-white">
                  {project.shortDescription}
                </p>
              )}

              {/* Category */}
              {project.category && (
                <div className="mb-5">
                  <p className="mb-3 text-xs uppercase tracking-[0.2em] text-white/70">
                    Category:
                  </p>

                  <div className="flex flex-wrap gap-2">
                    {project.category.split(",").map((item, index) => (
                      <span
                        key={index}
                        className="rounded-full border border-white px-3 py-1 text-xs uppercase tracking-wider text-white font-semibold"
                      >
                        {item.trim()}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Worked On */}
              {project.workedOn?.length > 0 && (
                <div>
                  <p className="mb-3 text-xs uppercase tracking-[0.2em] text-white/70">
                    Worked on:
                  </p>

                  <div className="flex flex-wrap gap-2">
                    {project.workedOn.map(
                      (item, index) => (
                        <span
                          key={`${item}-${index}`}
                          className="rounded bg-white px-3 py-1 text-xs uppercase tracking-wider text-black font-semibold mr-2"
                        >
                          {item}
                        </span>
                      )
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ==============================
          ABOUT
      ============================== */}
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

        <div className="grid lg:grid-cols-12 gap-12">
          <div className="lg:col-span-3">
            <p className="text-xs uppercase tracking-[0.2em] text-black/40">
              project: {project.title}
            </p>
          </div>

          <div className="lg:col-span-8 lg:col-start-5">
            {project.about.title && (
              <h2 className="text-4xl md:text-6xl lg:text-7xl leading-[0.95] tracking-[-0.05em] font-medium">
                {project.about.title}
              </h2>
            )}

            {project.about?.description && (() => {
              const text = project.about.description.trim();
              const sentences = text.split(/(?<=\.)\s+/); // split after full stops

              // Find the best middle point
              let firstHalf = [];
              let secondHalf = [];
              let currentLength = 0;
              const midPoint = text.length / 2;

              sentences.forEach((sentence) => {
                if (currentLength < midPoint) {
                  firstHalf.push(sentence);
                  currentLength += sentence.length;
                } else {
                  secondHalf.push(sentence);
                }
              });

              // Fallback if only one sentence
              if (secondHalf.length === 0 && firstHalf.length > 1) {
                secondHalf = [firstHalf.pop()];
              }

              return (
                <div className="mt-12 grid md:grid-cols-2 gap-8">
                  <p className="text-black/60 leading-relaxed">
                    {firstHalf.join(" ")}
                  </p>
                  <p className="text-black/60 leading-relaxed">
                    {secondHalf.join(" ")}
                  </p>
                </div>
              );
            })()}
          </div>
        </div>
      </section>

      {/* ==============================
          SHOWCASE
      ============================== */}
      <div className="relative overflow-hidden bg-primary/10">
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

      {/* <RelatedProjects currentProject={project} /> */}

      {/* <section className="px-5 py-24 md:px-10 lg:px-16">
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
      </section> */}

    </main>
  );
}
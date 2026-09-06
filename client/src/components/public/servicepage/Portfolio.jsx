import ProjectCard from "../ProjectCard";

export default function Portfolio({ service, projects }) {
    return (
        <>
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
        </>
    )
}

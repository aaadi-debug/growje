import MediaRenderer from "../MediaRenderer";

export default function HeroSection({ service }) {

    return (
        <>
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
        </>
    )
}
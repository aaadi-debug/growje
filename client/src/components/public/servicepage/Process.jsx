
export default function Process({ processData }) {
    return (
        <>
            {processData?.steps?.length > 0 && (
                <section className="relative overflow-hidden px-6 lg:px-10 py-16 lg:py-24 bg-gray-50">

                    {/* Soft blobs */}
                    <div
                        className="pointer-events-none absolute -left-20 top-10 h-72 w-72 rounded-full bg-orange-300/30 blur-3xl"
                        aria-hidden="true"
                    />
                    <div
                        className="pointer-events-none absolute -right-16 bottom-10 h-80 w-80 rounded-full bg-teal-300/25 blur-3xl"
                        aria-hidden="true"
                    />

                    {/* Optional light grid */}
                    <div
                        className="pointer-events-none absolute inset-0 opacity-[0.65]
                    [background-image:linear-gradient(to_right,rgba(0,0,0,0.06)_1px,transparent_1px),linear-gradient(to_bottom,rgba(0,0,0,0.06)_1px,transparent_1px)]
                    [background-size:48px_48px]"
                        aria-hidden="true"
                    />

                    <div className="relative z-10">
                        {/* Header */}
                        <div className="flex flex-col lg:flex-row lg:justify-between gap-8 mb-20 max-sm:mb-10">
                            <div>
                                <p className="text-xs uppercase tracking-[0.2em] text-black/40 mb-5">
                                    our process
                                </p>
                                <h2 className="text-4xl md:text-6xl lg:text-7xl tracking-[-0.06em] leading-none">
                                    {processData.title || "Our Process"}
                                </h2>
                            </div>

                            <p className="max-w-sm text-black/50 leading-relaxed lg:pt-10">
                                We measure success not just by projects delivered, but by the lasting impact we create for our partners.
                            </p>
                        </div>

                        <div className=" gap-6 mx-auto">
                            {processData.steps.map((step, index) => (
                                <div
                                    key={index}
                                    className="group grid grid-cols-12 gap-4 py-8 lg:py-10 border-b border-black/20 items-center hover:px-4 transition-all duration-500 hover:bg-primary/10"
                                >
                                    <span className="col-span-1  max-sm:col-span-1 text-sm text-black/30">
                                        {String(index + 1).padStart(2, "0")}
                                    </span>
                                    <h3 className="col-span-5 max-sm:col-span-10 text-xl md:text-2xl lg:text-3xl tracking-tight font-medium max-sm:font-semibold">
                                        {step.title}
                                    </h3>
                                    <span className="col-span-6 max-sm:col-span-11 flex justify-start text-black/60">
                                        {step.description}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            )}
        </>
    )
}

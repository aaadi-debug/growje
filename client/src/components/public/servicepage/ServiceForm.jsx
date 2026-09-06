

export default function ServiceForm({ service }) {
    return (
        <>
            <section className="relative overflow-hidden px-6 lg:px-10 py-12 lg:py-16 flex justify-center bg-white">
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

                <h2 className="relative z-10 max-w-5xl text-center text-xl font-medium leading-tight md:text-5xl lg:text-6xl">
                    {service.shortDescription || service.title}
                </h2>
            </section>
        </>
    )
}
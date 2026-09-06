export default function About({ aboutData }) {
    return (
        <>
            {aboutData.length > 0 && (
                <section className="px-6 lg:px-10 py-10 lg:py-16">
                    {aboutData.map((section, index) => {
                        const isEven = index % 2 === 1; // 0 = content left, 1 = image left

                        return (
                            <div
                                key={index}
                                className={`grid lg:grid-cols-2 gap-12 lg:gap-20 items-center py-16 lg:py-24 ${index > 0 ? "border-t border-black/5" : ""
                                    }`}
                            >
                                {/* Content */}
                                <div className={`${isEven ? "lg:order-2" : "lg:order-1"}`}>
                                    <p className="text-xs uppercase tracking-[0.2em] text-blue-600 mb-4">
                                        About
                                    </p>
                                    <h2 className="text-3xl md:text-4xl lg:text-5xl font-medium leading-tight mb-6">
                                        {section.title}
                                    </h2>
                                    <p className="text-black/70 leading-relaxed mb-6 whitespace-pre-line">
                                        {section.description}
                                    </p>

                                    {section.bullets?.length > 0 && (
                                        <ul className="space-y-3">
                                            {section.bullets.map(
                                                (bullet, bIndex) =>
                                                    bullet && (
                                                        <li key={bIndex} className="flex items-start gap-3">
                                                            <span className="mt-1.5 w-2 h-2 rounded-full bg-blue-600 flex-shrink-0" />
                                                            <span className="text-black/80">{bullet}</span>
                                                        </li>
                                                    )
                                            )}
                                        </ul>
                                    )}
                                </div>

                                {/* Image */}
                                <div className={`${isEven ? "lg:order-1" : "lg:order-2"}`}>
                                    {section.image?.url ? (
                                        <div className="relative rounded-2xl overflow-hidden aspect-[4/3]">
                                            <img
                                                src={section.image.url}
                                                alt={section.image.alt || section.title}
                                                className="w-full h-full object-cover"
                                            />
                                        </div>
                                    ) : (
                                        <div className="rounded-2xl bg-gray-100 aspect-[4/3] flex items-center justify-center text-gray-400">
                                            No Image
                                        </div>
                                    )}
                                </div>
                            </div>
                        );
                    })}
                </section>
            )}
        </>
    )
}

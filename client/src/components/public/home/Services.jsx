import Link from "next/link";
import { ArrowUpRight, ArrowRight } from "lucide-react";

// ─────────────────────────────────────────────
// Put your image links here
// Key = exact service title (or close enough)
// ─────────────────────────────────────────────
const serviceImages = {
    "Brand Strategy": "https://images.unsplash.com/photo-1557804506-669a709abc7d?w=800&q=80",
    "Website UI/UX": "/assets/images/home/website_uiux.png",
    "Digital Marketing": "/assets/images/home/digi_mark.png",
    "Content Creation": "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&q=80",
    // add more as needed...
};

// fallback image if title doesn't match
const defaultImage = "https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&q=80";

export default function Services({ services }) {

    return (
        <>
            <section className="relative text-white px-6 lg:px-10 py-16 lg:py-20 lg:pb-40 overflow-hidden bg-black">

                {/* Background image */}
                <div
                    className="absolute inset-0 bg-cover bg-center bg-no-repeat bg-fixed opacity-80"
                    style={{
                        backgroundImage: "url('assets/images/home/services_bg.avif')", // ← change to your actual filename
                    }}
                />


                <div className="relative z-10">
                    {/* <div className="flex flex-col lg:flex-row lg:justify-between gap-8 mb-20"> */}

                    <h2 className="text-4xl md:text-6xl lg:text-7xl tracking-[-0.06em] leading-none mb-10 text-white text-center">
                        Our Services
                    </h2>
                    {/* </div> */}

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
                        {services.map((service) => {
                            // try exact match first, then case-insensitive
                            const image =
                                serviceImages[service.title] ||
                                Object.entries(serviceImages).find(
                                    ([key]) => key.toLowerCase() === service.title?.toLowerCase()
                                )?.[1] ||
                                defaultImage;

                            return (
                                <Link
                                    key={service._id}
                                    href={`/${service.slug}`}
                                    className="
                                    group
                                    relative
                                    aspect-[4/5]
                                    overflow-hidden
                                    rounded-2xl
                                    border border-white/10
                                    "
                                >
                                    {/* Background image */}
                                    <div
                                        className="
                                            absolute inset-0
                                            bg-cover bg-center
                                            transition-transform duration-700
                                            group-hover:scale-105
                                        "
                                        style={{ backgroundImage: `url(${image})` }}
                                    />

                                    {/* Soft dark overlay */}
                                    {/* <div className="absolute inset-0 bg-black/30 group-hover:bg-black/40 transition-colors duration-500" /> */}

                                    {/* Bottom gradient + title */}
                                    <div className="absolute inset-x-0 bottom-0">
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent" />

                                        <div className="relative flex items-end justify-between gap-4 p-5 lg:p-6">
                                            <h3 className="text-xl md:text-2xl lg:text-3xl font-medium tracking-tight leading-tight">
                                                {service.title}
                                            </h3>

                                            <span
                                                className="
                                                    shrink-0
                                                    w-10 h-10
                                                    rounded-full
                                                    border border-white/40
                                                    flex items-center justify-center
                                                    bg-white/10
                                                    backdrop-blur-sm
                                                    group-hover:bg-white
                                                    group-hover:text-black
                                                    group-hover:border-white
                                                    transition-all duration-300
                                                "
                                            >
                                                <ArrowUpRight size={18} />
                                            </span>
                                        </div>
                                    </div>
                                </Link>
                            );
                        })}
                    </div>

                    {/* <div className="border-t border-white/20">
                        {services.map((service, index) => (
                            <Link
                                href={`/${service.slug}`}
                                key={service._id}
                                className="
                                group
                                grid
                                grid-cols-12
                                gap-4
                                py-8
                                lg:py-10
                                border-b
                                border-white/20
                                items-center
                                hover:px-4
                                transition-all
                                duration-500
                                hover:bg-white/10
                            "
                            >
                                <span className="col-span-1 text-sm text-white/30">
                                    {String(index + 1).padStart(2, "0")}
                                </span>
                                <h3 className="col-span-9 text-xl md:text-3xl lg:text-4xl tracking-tight">
                                    {service.title}
                                </h3>
                                <span className="col-span-2 flex justify-end">
                                    <span
                                        className="
                                        w-10
                                        h-10
                                        lg:w-14
                                        lg:h-14
                                        rounded-full
                                        border
                                        border-white/30
                                        flex
                                        items-center
                                        justify-center
                                        group-hover:bg-white
                                        group-hover:text-black
                                        transition
                                    "
                                    >
                                        <ArrowUpRight size={20} />
                                    </span>
                                </span>
                            </Link>
                        ))}
                    </div> */}
                </div>
            </section>
        </>
    );
}

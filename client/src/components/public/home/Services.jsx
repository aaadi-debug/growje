"use client";

import Link from "next/link";
import { useState } from "react";
import { ArrowUpRight } from "lucide-react";

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

const defaultImage =
    "https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&q=80";

export default function Services({ featuredProjects = [], services = [] }) {
    const [activeTab, setActiveTab] = useState("all"); // "all" | "digital" | "ground"

    // Filter services based on selected tab
    const filteredServices =
        activeTab === "all"
            ? services
            : activeTab === "digital"
                ? services.filter((s) => s.category === "online")
                : services.filter((s) => s.category === "offline");

    // console.log("Services: ", services)
    // console.log("filteredServices: ", filteredServices)

    return (
        <section className="relative text-white px-6 lg:px-10 py-16 lg:py-20 lg:pb-40 overflow-hidden bg-black">
            {/* Background image */}
            <div
                className="absolute inset-0 bg-cover bg-center bg-no-repeat bg-fixed opacity-80"
                style={{
                    backgroundImage: "url('/assets/images/home/services_bg.avif')",
                }}
            />

            <div className="relative z-10">
                <h2 className="text-4xl md:text-6xl lg:text-7xl tracking-[-0.06em] leading-none mb-10 text-white text-center">
                    Our Services
                </h2>

                {/* Tabs */}
                {services.length > 0 && (
                    <div className="flex flex-wrap justify-center gap-3 mb-8 md:mb-10 overflow-x-auto pb-2 scrollbar-hide">
                        {/* All */}
                        <button
                            onClick={() => setActiveTab("all")}
                            className={`
                px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-300 cursor-pointer
                ${activeTab === "all"
                                    ? "bg-primary text-white"
                                    : "bg-white text-black/70 hover:bg-primary hover:text-white"
                                }
              `}
                        >
                            All
                        </button>

                        {/* Digital = online */}
                        <button
                            onClick={() => setActiveTab("digital")}
                            className={`
                px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-300 whitespace-nowrap cursor-pointer
                ${activeTab === "digital"
                                    ? "bg-primary text-white"
                                    : "bg-white text-black/70 hover:bg-primary hover:text-white"
                                }
              `}
                        >
                            Digital
                        </button>

                        {/* Ground = offline */}
                        <button
                            onClick={() => setActiveTab("ground")}
                            className={`
                px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-300 whitespace-nowrap cursor-pointer
                ${activeTab === "ground"
                                    ? "bg-primary text-white"
                                    : "bg-white text-black/70 hover:bg-primary hover:text-white"
                                }
              `}
                        >
                            Ground
                        </button>
                    </div>
                )}

                {/* Services Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
                    {filteredServices.length > 0 ? (
                        filteredServices.map((service) => {
                            const image =
                                serviceImages[service.title] ||
                                Object.entries(serviceImages).find(
                                    ([key]) =>
                                        key.toLowerCase() === service.title?.toLowerCase()
                                )?.[1] ||
                                defaultImage;

                            return (
                                <Link
                                    key={service._id}
                                    href={`/${service.slug}`}
                                    className="group relative aspect-[4/5] overflow-hidden rounded-2xl border border-white/10"
                                >
                                    {/* Background image */}
                                    <div
                                        className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                                        style={{ backgroundImage: `url(${image})` }}
                                    />

                                    {/* Bottom gradient + title */}
                                    <div className="absolute inset-x-0 bottom-0">
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent" />

                                        <div className="relative flex items-end justify-between gap-4 p-5 lg:p-6">
                                            <h3 className="text-xl md:text-2xl lg:text-3xl font-medium tracking-tight leading-tight">
                                                {service.title}
                                            </h3>

                                            <span className="shrink-0 w-10 h-10 rounded-full border border-white/40 flex items-center justify-center bg-white/10 backdrop-blur-sm group-hover:bg-white group-hover:text-black group-hover:border-white transition-all duration-300">
                                                <ArrowUpRight size={18} />
                                            </span>
                                        </div>
                                    </div>
                                </Link>
                            );
                        })
                    ) : (
                        <div className="col-span-full text-center py-16 text-white/60">
                            No services found in this category.
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
}
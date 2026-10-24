"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { ArrowUpRight, ChevronLeft, ChevronRight } from "lucide-react";

// ─────────────────────────────────────────────
// Put your image links here
// Key = exact service title (or close enough)
// ─────────────────────────────────────────────
const serviceImages = {
    // Online
    "Digital Marketing": "/assets/images/home/digital-marketing.jpeg",
    "Video Production & Editing": "/assets/images/home/video_prod.jpeg",
    "Graphic Designing": "/assets/images/home/graphic-design.jpeg",
    "Web development": "/assets/images/home/website-development.jpeg",
    // Offline
    "Corporate Gifting": "/assets/images/home/corporate-gifting.jpeg",
    "Printing": "/assets/images/home/print-and-pack.jpeg",
    "Events & Experiences": "/assets/images/home/events.jpeg",
};

const defaultImage =
    "https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&q=80";

export default function Services({ featuredProjects = [], services = [] }) {
    const [activeTab, setActiveTab] = useState("all"); // "all" | "digital" | "ground"
    const [current, setCurrent] = useState(0);
    const [visibleCount, setVisibleCount] = useState(1);

    // Filter services based on selected tab
    const filteredServices =
        activeTab === "all"
            ? services
            : activeTab === "digital"
                ? services.filter((s) => s.category === "online")
                : services.filter((s) => s.category === "offline");

    // Update visible cards based on screen size
    useEffect(() => {
        const updateVisible = () => {
            if (window.innerWidth >= 1440) {
                setVisibleCount(4.6);
            } else if (window.innerWidth >= 1024) {
                setVisibleCount(4);
            } else if (window.innerWidth >= 768) {
                setVisibleCount(2.6);
            } else {
                setVisibleCount(1.3);
            }
        };

        updateVisible();
        window.addEventListener("resize", updateVisible);
        return () => window.removeEventListener("resize", updateVisible);
    }, []);

    // Reset slider when tab / filtered list changes
    useEffect(() => {
        setCurrent(0);
    }, [activeTab, filteredServices.length]);

    const maxIndex = Math.max(0, filteredServices.length - visibleCount);

    const next = () => {
        setCurrent((prev) => (prev >= maxIndex ? 0 : prev + 1));
    };

    const prev = () => {
        setCurrent((prev) => (prev <= 0 ? maxIndex : prev - 1));
    };

    // Optional autoplay (same as testimonials)
    useEffect(() => {
        if (filteredServices.length <= visibleCount) return;
        const timer = setInterval(next, 5000);
        return () => clearInterval(timer);
    }, [current, visibleCount, filteredServices.length]);

    return (
        <section className="relative text-white px-6 lg:px-10 lg:py-16 md:py-12 py-6 overflow-hidden bg-black">
            {/* Background image */}
            <div
                className="absolute inset-0 bg-cover bg-center bg-no-repeat bg-fixed opacity-80"
                style={{
                    backgroundImage: "url('/assets/images/home/services_bg.avif')",
                }}
            />

            <div className="relative z-10">
                <h2 className="text-3xl lg:text-5xl md:text-4xl tracking-tight text-center mb-6">
                    Our Services
                </h2>

                {/* Tabs */}
                {services.length > 0 && (
                    <div className="flex flex-wrap justify-center gap-3 mb-8 md:mb-10 overflow-x-auto pb-2 scrollbar-hide">
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

                {/* Services Slider */}
                {filteredServices.length > 0 ? (
                    <>
                        <div className="overflow-hidden">
                            <div
                                className="flex transition-transform duration-500 ease-out"
                                style={{
                                    transform: `translateX(-${current * (100 / visibleCount)}%)`,
                                }}
                            >
                                {filteredServices.map((service) => {
                                    const image =
                                        serviceImages[service.title] ||
                                        Object.entries(serviceImages).find(
                                            ([key]) =>
                                                key.toLowerCase() === service.title?.toLowerCase()
                                        )?.[1] ||
                                        defaultImage;

                                    return (
                                        <div
                                            key={service._id}
                                            className="flex-shrink-0 px-2 md:px-3"
                                            style={{ width: `${100 / visibleCount}%` }}
                                        >
                                            <Link
                                                href={`/${service.slug}`}
                                                className="group relative aspect-[4/5] overflow-hidden rounded-2xl border border-white/10 block"
                                            >
                                                {/* Background image */}
                                                <div
                                                    className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105 rounded-2xl"
                                                    style={{ backgroundImage: `url(${image})` }}
                                                />

                                                {/* Bottom gradient + title */}
                                                <div className="absolute inset-x-0 bottom-0">
                                                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent" />

                                                    <div className="relative flex items-end justify-between gap-2 p-5 lg:p-6">
                                                        {/* <h3 className="relative text-white 2xl:text-3xl xl:text-3xl lg:text-2xl md:text-3xl text-2xl max-sm:text-base max-sm:leading-tight font-medium">
                                                            {service.title}
                                                        </h3> */}
                                                        <h3 className="relative text-white 2xl:text-2xl xl:text-2xl lg:text-2xl md:text-3xl text-2xl max-sm:text-base max-sm:leading-tight font-medium">
                                                            {(() => {
                                                                const title = service.title || "";
                                                                const spaceIndex = title.indexOf(" ");

                                                                if (spaceIndex === -1) {
                                                                    // Single word – keep current weight
                                                                    return title;
                                                                }

                                                                const firstLine = title.slice(0, spaceIndex);
                                                                const secondLine = title.slice(spaceIndex + 1);

                                                                return (
                                                                    <>
                                                                        <span className="font-extrabold block">{firstLine}</span>
                                                                        <span className="font-medium block">{secondLine}</span>
                                                                    </>
                                                                );
                                                            })()}
                                                        </h3>

                                                        <span className="shrink-0 w-10 h-10 rounded-full border border-white/40 flex items-center justify-center bg-white/10 backdrop-blur-sm group-hover:bg-white group-hover:text-black group-hover:border-white transition-all duration-300">
                                                            <ArrowUpRight size={18} />
                                                        </span>
                                                    </div>
                                                </div>
                                            </Link>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>

                        {/* Navigation – only show if there are more cards than visible */}
                        {filteredServices.length > visibleCount && (
                            <div className="flex items-center justify-between mt-8 md:mt-10 max-w-5xl mx-auto">
                                {/* Dots */}
                                <div className="flex gap-2">
                                    {Array.from({ length: maxIndex + 1 }).map((_, index) => (
                                        <button
                                            key={index}
                                            onClick={() => setCurrent(index)}
                                            className={`h-1.5 rounded-full transition-all duration-300 ${index === current
                                                    ? "w-8 bg-primary"
                                                    : "w-1.5 bg-white/30 hover:bg-white/50"
                                                }`}
                                            aria-label={`Go to slide ${index + 1}`}
                                        />
                                    ))}
                                </div>

                                {/* Arrows */}
                                <div className="flex gap-3">
                                    <button
                                        onClick={prev}
                                        className="w-11 h-11 rounded-full border border-white/20 bg-primary flex items-center justify-center
                               hover:bg-white hover:text-black text-white transition-all duration-300 cursor-pointer"
                                        aria-label="Previous"
                                    >
                                        <ChevronLeft size={20} />
                                    </button>
                                    <button
                                        onClick={next}
                                        className="w-11 h-11 rounded-full border border-white/20 bg-primary flex items-center justify-center
                               hover:bg-white hover:text-black text-white transition-all duration-300 cursor-pointer"
                                        aria-label="Next"
                                    >
                                        <ChevronRight size={20} />
                                    </button>
                                </div>
                            </div>
                        )}
                    </>
                ) : (
                    <div className="text-center py-16 text-white/60">
                        No services found in this category.
                    </div>
                )}
            </div>
        </section>
    );
}
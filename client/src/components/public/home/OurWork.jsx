"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ArrowUpRight, ChevronLeft, ChevronRight } from "lucide-react";

export default function OurWork({ featuredProjects = [], services = [] }) {
  const [activeTab, setActiveTab] = useState("all");
  const [current, setCurrent] = useState(0);
  const [visibleCount, setVisibleCount] = useState(1);

  // Filter projects by selected service
  const filteredProjects =
    activeTab === "all"
      ? featuredProjects
      : featuredProjects.filter((project) =>
          project.services?.some((service) => service._id === activeTab)
        );

  // Responsive visible cards
  useEffect(() => {
    const updateVisible = () => {
      if (window.innerWidth >= 1440) {
        setVisibleCount(4.2);
      } else if (window.innerWidth >= 1024) {
        setVisibleCount(3.5);
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

  // Reset slider when tab / list changes
  useEffect(() => {
    setCurrent(0);
  }, [activeTab, filteredProjects.length]);

  const maxIndex = Math.max(0, Math.ceil(filteredProjects.length - visibleCount));

  const next = () => {
    setCurrent((prev) => (prev >= maxIndex ? 0 : prev + 1));
  };

  const prev = () => {
    setCurrent((prev) => (prev <= 0 ? maxIndex : prev - 1));
  };

  // Optional autoplay
  useEffect(() => {
    if (filteredProjects.length <= visibleCount) return;
    const timer = setInterval(next, 5000);
    return () => clearInterval(timer);
  }, [current, visibleCount, filteredProjects.length]);

  console.log("Filtered Projects: ", filteredProjects)

  return (
    <section className="relative overflow-hidden px-6 lg:px-10 pb-16 lg:pb-24 bg-black">
      {/* Background */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat bg-fixed opacity-80"
        style={{
          backgroundImage: "url('/assets/images/home/services_bg.avif')",
        }}
      />

      <div className="relative z-10">
        {/* Optional heading */}
        {/* <h2 className="text-3xl lg:text-5xl md:text-4xl tracking-tight text-center text-white mb-6">
          Our Work
        </h2> */}

        {/* Tabs */}
        {services.length > 0 && (
          <div className="flex flex-wrap justify-center gap-3 mb-8 md:mb-10 overflow-x-auto pb-2 scrollbar-hide">
            <button
              onClick={() => setActiveTab("all")}
              className={`
                px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-300 cursor-pointer
                ${
                  activeTab === "all"
                    ? "bg-primary text-white"
                    : "bg-white text-black/70 hover:bg-primary hover:text-white"
                }
              `}
            >
              All
            </button>

            {services.map((service) => (
              <button
                key={service._id}
                onClick={() => setActiveTab(service._id)}
                className={`
                  px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-300 whitespace-nowrap cursor-pointer
                  ${
                    activeTab === service._id
                      ? "bg-primary text-white"
                      : "bg-white text-black/70 hover:bg-primary hover:text-white"
                  }
                `}
              >
                {service.title}
              </button>
            ))}
          </div>
        )}

        {/* Projects Slider */}
        {filteredProjects.length > 0 ? (
          <>
            <div className="overflow-hidden">
              <div
                className="flex transition-transform duration-500 ease-out"
                style={{
                  transform: `translateX(-${current * (100 / visibleCount)}%)`,
                }}
              >
                {filteredProjects.map((project) => {
                  const image =
                    project.cardImage?.url ||
                    project.hero?.media?.url ||
                    "";

                  return (
                    <div
                      key={project._id}
                      className="flex-shrink-0 px-2 md:px-3"
                      style={{ width: `${100 / visibleCount}%` }}
                    >
                      <Link
                        href={`/portfolio/${project.slug}`}
                        className="group relative aspect-[3/4] overflow-hidden rounded-2xl border border-white/10 block bg-zinc-900"
                      >
                        {/* Image */}
                        {image ? (
                          <div
                            className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                            style={{ backgroundImage: `url(${image})` }}
                          />
                        ) : (
                          <div className="absolute inset-0 bg-zinc-800" />
                        )}

                        {/* Gradient + content */}
                        <div className="absolute inset-x-0 bottom-0">
                          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent" />

                          <div className="relative flex items-end justify-between gap-3 p-5 lg:p-6">
                            <div className="min-w-0">
                              <h3 className="text-white text-xl md:text-2xl font-medium leading-tight truncate">
                                {project.title}
                              </h3>
                              {project.clientName && (
                                <p className="mt-1 text-sm text-white/60 truncate">
                                  {project.clientName}
                                </p>
                              )}
                              {project.category && (
                                <p className="mt-1 text-xs uppercase tracking-wider text-white/40">
                                  {project.category}
                                </p>
                              )}
                            </div>

                            <span className="shrink-0 w-10 h-10 rounded-full text-white border border-white/40 flex items-center justify-center bg-white/10 backdrop-blur-sm group-hover:bg-white group-hover:text-black group-hover:border-white transition-all duration-300">
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

            {/* Navigation */}
            {filteredProjects.length > visibleCount && (
              <div className="flex items-center justify-between mt-8 md:mt-10 max-w-5xl mx-auto">
                {/* Dots */}
                <div className="flex gap-2">
                  {Array.from({ length: maxIndex + 1 }).map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrent(index)}
                      className={`h-1.5 rounded-full transition-all duration-300 ${
                        index === current
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
          <div className="py-20 text-center text-white/50">
            No projects found for this service.
          </div>
        )}
      </div>
    </section>
  );
}
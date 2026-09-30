"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowUpRight, ArrowRight } from "lucide-react";
import RotatingCards from "./RotatingCards";

export default function OurWork({ featuredProjects = [], services = [] }) {
    const [activeTab, setActiveTab] = useState("all");

    // Filter projects based on selected service
    const filteredProjects =
        activeTab === "all"
            ? featuredProjects
            : featuredProjects.filter((project) =>
                project.services?.some((service) => service._id === activeTab)
            );

    // console.log("Services fecthed: ", services)
    // console.log("Projects fetched: ", featuredProjects)
    console.log("Fileterd Projects: ", filteredProjects)

    return (
        <section className="relative overflow-hidden px-6 lg:px-10 pb-16 lg:pb-24 bg-black -mt-16">
            {/* Background image */}
            <div
                className="absolute inset-0 bg-cover bg-center bg-no-repeat bg-fixed opacity-80"
                style={{
                    backgroundImage: "url('assets/images/home/services_bg.avif')", // ← change to your actual filename
                }}
            />

            {/* Header */}
            {/* <div className="relative z-10 flex items-end justify-between mb-10 md:mb-16"> */}
            <div className="relative z-10  mb-10 md:mb-16">

                <h2 className="text-4xl md:text-6xl lg:text-7xl tracking-[-0.06em] leading-none text-white text-center">
                    Our Work
                </h2>

                {/* <Link
                    href="/portfolio"
                    className="group hidden md:inline-flex items-center gap-3 text-sm font-medium border-b border-black pb-2 relative after:absolute after:bottom-0 after:left-0 after:h-px after:w-0 after:bg-primary after:transition-all after:duration-300 hover:after:w-full hover:text-primary hover:border-primary"
                >
                    View all work
                    <ArrowUpRight
                        size={16}
                        className="transition-all duration-300 ease-out group-hover:rotate-45 group-hover:translate-x-1"
                    />
                </Link> */}
            </div>

            <div className="relative z-10 ">

                {/* Tabs */}
                {services.length > 0 && (
                    <div className="flex flex-wrap justify-center gap-3 mb-8 md:mb-10 overflow-x-auto pb-2 scrollbar-hide">
                        <button
                            onClick={() => setActiveTab("all")}
                            className={`
                            px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-300 cursor-pointer
                            ${activeTab === "all"
                                    ? "bg-primary text-white" : "bg-white text-black/70 hover:bg-primary hover:text-white"
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
                                ${activeTab === service._id
                                        ? "bg-primary text-white" : "bg-white text-black/70 hover:bg-primary hover:text-white"
                                    }
                            `}
                            >
                                {service.title}
                            </button>
                        ))}
                    </div>
                )}

                {/* Projects Grid */}
                {/* <div className="grid md:grid-cols-3 gap-x-6 gap-y-16">
                {filteredProjects.length > 0 ? (
                    filteredProjects.map((project, index) => {
                        const image = project.hero?.media?.url;

                        return (
                            <Link
                                href={`/portfolio/${project.slug}`}
                                key={project._id}
                                className={`
                                    group
                                    ${index % 3 === 0 ? "md:mt-20" : ""}
                                `}
                            >
                                <div className="border relative overflow-hidden bg-gray-100">
                                    {image && (
                                        <img
                                            src={image}
                                            alt={project.hero?.media?.alt || project.title}
                                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                                        />
                                    )}

                                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition" />

                                    <div className="absolute top-5 right-5 w-12 h-12 rounded-full bg-white flex items-center justify-center opacity-0 translate-y-3 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
                                        <ArrowUpRight size={20} />
                                    </div>
                                </div>

                                <div className="mt-5 flex justify-between gap-6">
                                    <div>
                                        <h3 className="text-xl md:text-2xl font-medium">
                                            {project.title}
                                        </h3>
                                        {project.clientName && (
                                            <p className="mt-1 text-sm text-black/50">
                                                {project.clientName}
                                            </p>
                                        )}
                                    </div>
                                    {project.category && (
                                        <span className="text-xs uppercase tracking-wider text-black/40">
                                            {project.category}
                                        </span>
                                    )}
                                </div>
                            </Link>
                        );
                    })
                ) : (
                    <div className="col-span-full py-20 text-center text-black/40">
                        No projects found for this service.
                    </div>
                )}
            </div> */}

                {/* Projects Slider */}
                <div className="relative">
                    {filteredProjects.length > 0 ? (
                        <div className="flex gap-6 overflow-x-auto snap-x snap-mandatory pb-8 scrollbar-hide">
                            {filteredProjects.map((project) => {
                                const image = project.hero?.media?.url;

                                return (
                                    <Link
                                        href={`/portfolio/${project.slug}`}
                                        key={project._id}
                                        className="group relative flex-shrink-0 w-[85%] sm:w-[55%] md:w-[38%] lg:w-[22%] xl:w-[20%] snap-start border border-gray-100 p-2 rounded-[40px] shadow-sm bg-white"
                                    >
                                        <div className="relative overflow-hidden bg-gray-100 aspect-[3/4] rounded-[40px]">
                                            {image && (
                                                <img
                                                    src={image}
                                                    alt={project.hero?.media?.alt || project.title}
                                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 rounded-[40px]"
                                                />
                                            )}

                                            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition" />

                                            <div className="absolute top-5 right-5 w-12 h-12 rounded-full bg-white flex items-center justify-center opacity-0 translate-y-3 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
                                                <ArrowUpRight size={20} />
                                            </div>
                                        </div>

                                        <div className="mt-2 pb-3 flex-col gap-4 px-4">
                                            {/* <h3 className="text-xl md:text-2xl font-medium">
                                                {project.title}
                                            </h3> */}
                                            {project.category && (
                                                <span className="text-xs uppercase tracking-wider text-gray-500 font-medium">
                                                    {project.title || project.clientName}
                                                </span>
                                            )}
                                            {project.clientName && (
                                                <p className="mt-1 text-sm text-primary font-semibold">
                                                    {project.services[0].title || project.clientName}
                                                </p>
                                            )}

                                        </div>
                                    </Link>
                                );
                            })}
                        </div>
                    ) : (
                        <div className="py-20 text-center text-black/40">
                            No projects found for this service.
                        </div>
                    )}
                </div>

                {/* Mobile View All */}
                {/* <div className="mt-16 md:hidden">
                <Link
                    href="/portfolio"
                    className="inline-flex items-center gap-2 text-sm border-b border-black pb-2"
                >
                    View all work
                    <ArrowRight size={16} />
                </Link>
            </div> */}
            </div>

        </section>
    );
}